from PIL import Image
import sys

def remove_white_background(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # Change all white (also shades of whites)
            # to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        # Crop the image to remove excess transparent space
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            
        img.save(output_path, "PNG")
        print("Successfully removed background")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    remove_white_background("public/full-logo.png", "public/full-logo-transparent.png")
