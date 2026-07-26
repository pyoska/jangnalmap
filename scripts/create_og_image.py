import os
from PIL import Image, ImageDraw, ImageFont

def generate_og_image():
    # 1200x630 pixel canvas (Naver & Kakao OG standard)
    width = 1200
    height = 630
    
    # Create image with a premium gradient-like background
    img = Image.new('RGB', (width, height), color='#060913')
    draw = ImageDraw.Draw(img)
    
    # Draw green accent bar at top
    draw.rectangle([(0, 0), (width, 16)], fill='#10B981')
    
    # Draw rounded card container in center
    draw.rounded_rectangle([(60, 60), (1140, 570)], radius=32, fill='#0F172A', outline='#1E293B', width=3)
    
    # Try using default or system font
    try:
        font_title = ImageFont.truetype("malgun.ttf", 68)
        font_sub = ImageFont.truetype("malgun.ttf", 36)
        font_badge = ImageFont.truetype("malgun.ttf", 28)
    except:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_badge = ImageFont.load_default()

    # Draw Badge
    draw.rounded_rectangle([(110, 120), (380, 175)], radius=16, fill='#047857')
    draw.text((130, 130), "📌 전국 1,300개 오일장", fill='#FFFFFF', font=font_badge)
    
    # Draw Main Title
    draw.text((110, 210), "장날맵.com", fill='#10B981', font=font_title)
    draw.text((110, 300), "대한민국 전통 오일장 지도 포털", fill='#F8FAFC', font=font_title)
    
    # Draw Subtitle
    draw.text((110, 420), "오늘 개장 여부 • 실시간 기상청 날씨 • 비밀 주차 꿀팁", fill='#94A3B8', font=font_sub)
    draw.text((110, 480), "모바일 온누리상품권 10% 할인 가이드", fill='#64748B', font=font_sub)
    
    output_path = os.path.join('public', 'og-image.png')
    img.save(output_path, 'PNG')
    print(f"Successfully generated Naver OG Image at {output_path} (1200x630)")

if __name__ == '__main__':
    generate_og_image()
