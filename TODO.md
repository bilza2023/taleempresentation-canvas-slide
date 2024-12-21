
# 20-Dec-2024
1: remove you own voice from the lib.
2: the internal objects of slides modules are being imported from inside using lib/index.js which is wrong . modules inside slides module should directly access their siblings
3: when we move slides up or down their timings are not being adjested.-- leave it as is and work in it when u know more about the problem.

4: when presentation ends , keep the screen. cut off the sound
5: when presentation ends , cut off the sound
