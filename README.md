"""# Virtual Pet Game (Flowertchi)
*by Amishi Sharma – 2025*  

A **Tamagotchi-inspired virtual pet game** built with JavaScript, where you care for a digital creature by feeding it, letting it sleep, keeping it clean, and interacting through animations and sound. The project reimagines the nostalgic Tamagotchi experience with modern web technologies, interactive controls, and a personalised audiovisual design.

---

## Inspiration & Sound Design  

For the soundtrack I integrated a **Brat-inspired theme**, influenced by Charli XCX’s 2024 album *Brat*. The choice of this soundscape was intentional: the album’s bold, glitchy, and playful electronic textures align with the experimental and vibrant aesthetic of this project. By incorporating music as part of the interaction (triggered with the `B` and `T` keys), I wanted to mirror how Charli’s work pushes boundaries between mainstream and experimental pop, creating a similar boundary-breaking atmosphere in this virtual pet. Technically, this was achieved with the **p5.sound library**, enabling playback control, event-driven audio responses, and seamless looping within the browser environment.

---

## Assignment Info  
- **Author:** Amishi Sharma  
- **Completed On:** 20/01/2025  

---

## Features  

### Core Interactions  
- **Control Buttons:**  
  - 🍏 Feed your pet  
  - 💤 Put your pet to sleep  
  - 🛁 Bathe your pet  
  - 🌟 Trigger custom star & grid animations  

- **Keyboard Controls:**  
  - Press **`B`** → Play Brat-inspired theme music  
  - Press **`T`** → Pause theme music  

### Animations  
- **Star Animation:** Clicking 🌟 creates a randomised sea of stars across the canvas.  
- **Custom Grid Animation:** The grid class is used for special actions and visual effects.  
- **Dynamic Pet Sprites:** Sprites change according to the pet’s mood (happy, sad, normal, dead).  

### Sound Integration  
- Theme music (`brattheme.mp3`) plays with keyboard input, enhancing the immersive experience.  

### UI & Interface  
- **Coloured Grid Squares** drawn from `gridSquare.js` for the custom interface.  
- **Health Bars** display hunger, sleep, and cleanliness status.  
- **Text Hints** ensure the user knows the available controls.  

---

## How to Run  

### Option 1: Run Locally  
1. Clone this repository:  
   ```bash
   git clone https://github.com/amishix/Recursive-designs.git
   cd Recursive-designs
   ```
2. Ensure the following project structure:  
   ```
   /assets
     ├── flowertchi-masterpengo.png
     ├── flowertchi-coords.csv
     ├── brattheme.mp3
   /js
     ├── controls.js
     ├── gridSquare.js
     ├── health.js
     ├── pet.js
     ├── sketch.js
     ├── utility.js
   index.html
   style/style.css
   ```
3. Open **`index.html`** in your browser.  
4. Enjoy caring for your Flowertchi!  

### Option 2: Use a Local Server (recommended)  
Some browsers block sound and file loading without a server. Run a lightweight local server:  
```bash
# Python 3
python -m http.server 8000
```
Then visit:  
[http://localhost:8000](http://localhost:8000)  

---

## Gameplay Overview  
- Your pet’s health decreases over time.  
- Keep it alive by managing hunger, sleep, and cleanliness.  
- Neglecting all three stats will lead to **Game Over**.  

---

## Technologies Used  
- **JavaScript ES6**  
- **p5.js** (graphics & interactivity)  
- **p5.sound.js** (audio control)  
- **CSV & Spritesheet integration**  

---

## Credits  
- **Sprite Sheet:** [MasterPengo](https://www.spriters-resource.com/fullview/112593/)  
- **Music Inspiration:** *Charli XCX – Brat (2024)*  
"""

