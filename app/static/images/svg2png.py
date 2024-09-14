
import cairosvg

# Convert SVG to PNG
def convert_svg_to_png(input_file, output_file):
    cairosvg.svg2png(url=input_file, write_to=output_file)

# Example usage
input_svg = 'np.svg'
output_png = 'np.png'
convert_svg_to_png(input_svg, output_png)

