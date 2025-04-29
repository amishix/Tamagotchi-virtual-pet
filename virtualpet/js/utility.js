/**
 * By Corey Ford 2024
 * All rights reserved
 */



// Thank you to rhetoxa 
// https://www.reddit.com/r/p5js/comments/12e035e/images_render_as_blurry_on_p5_canvas/?rdt=53787!
export function drawScaledImage(img, x, y, scale=1) {
    img.loadPixels()
    push()
    noStroke();
    for (let i = 0; i < img.width; i++) {
      for (let j = 0; j < img.height; j++) {
        fill(img.get(i, j));
        rect(x + i*scale, y + j*scale, scale, scale);
      }
    }
    pop()
}
