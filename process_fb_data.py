import json
import os
import urllib.request
import urllib.error

# Configuration
INPUT_FILE = '/Users/tencheme/Desktop/TNSA/src/data/raw_fb_posts.json'
OUTPUT_FILE = '/Users/tencheme/Desktop/TNSA/src/data/facebook-posts.json'
IMAGE_DIR = '/Users/tencheme/Desktop/TNSA/public/images/news'

# Ensure image directory exists
os.makedirs(IMAGE_DIR, exist_ok=True)

def clean_caption(text):
    # Remove common FB UI noise
    noise_phrases = [
        "Tnsa Dharamsala", "6.2K followers", "Message", "Follow", "Search",
        "following"
    ]
    lines = text.split('\n')
    cleaned_lines = []
    for line in lines:
        is_noise = False
        for phrase in noise_phrases:
            if phrase in line:
                is_noise = True
                break
        if not is_noise and len(line.strip()) > 0:
            cleaned_lines.append(line.strip())
    
    return "\n".join(cleaned_lines)

def download_image(url, index, subindex):
    try:
        # Generate filename based on hash or index
        ext = 'jpg'
        if 'webp' in url:
            ext = 'webp'
        
        filename = f"post_{index}_{subindex}.{ext}"
        filepath = os.path.join(IMAGE_DIR, filename)
        
        # public path for frontend
        public_path = f"/images/news/{filename}"

        # Download if not exists
        if not os.path.exists(filepath):
            print(f"Downloading {url} to {filepath}")
            # Mock user agent to avoid some blockages
            req = urllib.request.Request(
                url, 
                data=None, 
                headers={
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
                }
            )
            with urllib.request.urlopen(req, timeout=10) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
        
        return public_path
    
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return None

def process_data():
    with open(INPUT_FILE, 'r') as f:
        raw_posts = json.load(f)
    
    processed_posts = []
    
    for i, post in enumerate(raw_posts):
        cleaned_text = clean_caption(post.get('post_caption', ''))
        
        # Skip if effectively empty (was just noise)
        if not cleaned_text and not post.get('image_urls'):
            continue
            
        local_images = []
        for j, img_url in enumerate(post.get('image_urls', [])):
            local_path = download_image(img_url, i, j)
            if local_path:
                local_images.append(local_path)
        
        # Skip if no images (as per requirement "Photo-Only Posts")
        if not local_images:
            continue
            
        # Mock date if valid date is not found
        date = post.get('date')
        if not date or date == "Unknown" or len(date) > 50:
             # Assign mock reasonable dates for demo if scraped failed
             date = "Dec 12, 2025" 
        
        new_post = {
            "id": f"{i}",
            "date": date,
            "content": cleaned_text,
            "image_urls": local_images,
            "image_count": len(local_images),
            "link": "https://www.facebook.com/tibetfootballteam"
        }
        processed_posts.append(new_post)

    with open(OUTPUT_FILE, 'w') as f:
        json.dump(processed_posts, f, indent=2)
    
    print(f"Successfully processed {len(processed_posts)} posts.")

if __name__ == "__main__":
    process_data()
