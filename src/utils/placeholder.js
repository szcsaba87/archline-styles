// placehold.co generates a plain placeholder image server-side — a stand-in
// for the real thumbnail bitmaps a CAD engine would generate on the fly.
export function placeholderUrl(color = "e5e5e5", w = 96, h = 128) {
  return `https://placehold.co/${w}x${h}/${color}/6b6b6b.png?font=roboto&text=+`;
}
