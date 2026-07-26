import fs from 'fs';
import path from 'path';
import localMarketsData from '../../public/data/markets.json';

// Robust, zero-dependency CSV parser to handle quotes, newlines, and commas in cells
function parseCSV(text) {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push('');
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') {
        i++; // skip newline continuation
      }
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    lines.push(row);
  }
  return lines;
}

export async function getMarkets() {
  const sheetsUrl = process.env.GOOGLE_SHEETS_URL;

  // Fallback to local bundled markets.json if environment variable is not defined
  if (!sheetsUrl) {
    return localMarketsData;
  }

  try {
    // Fetch CSV from Google Sheets with revalidation cache of 10 minutes (600s)
    const response = await fetch(sheetsUrl, { next: { revalidate: 600 } });
    if (!response.ok) throw new Error(`Google Sheets fetch failed with status: ${response.status}`);
    const text = await response.text();
    const rows = parseCSV(text);

    if (rows.length < 2) return [];

    const headers = rows[0].map(h => h.trim());
    const data = [];

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (row.length < headers.length) continue;

      const item = {};
      headers.forEach((header, index) => {
        let val = row[index] || "";
        // Parse numbers for coordinates
        if (header === 'latitude' || header === 'longitude') {
          item[header] = parseFloat(val) || 0;
        } else {
          item[header] = val;
        }
      });
      
      // Basic check to ensure valid market object
      if (item.id && item.market_name) {
        data.push(item);
      }
    }

    if (data.length === 0) {
      console.warn("Google Sheets returned 0 valid items, falling back to localMarketsData");
      return localMarketsData;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch and parse Google Sheets data. Falling back to local bundled markets.json.', error);
    return localMarketsData;
  }
}

export async function getMarketById(id) {
  const markets = await getMarkets();
  return markets.find(m => String(m.id) === String(id)) || null;
}
