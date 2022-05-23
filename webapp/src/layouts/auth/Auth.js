import React from 'react'
import { Outlet } from 'react-router-dom'
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

export default function AuthLayout() {

  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };


  return (
    <section style={{ background: '#063270', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        "background": {
          "color": {
            "value": "#0d47a1"
          },
          "position": "50% 50%",
          "repeat": "no-repeat",
          "size": "cover"
        },
        "fullScreen": {
          "zIndex": 1
        },
        "interactivity": {
          "events": {
            "onClick": {
              "enable": true,
              "mode": "repulse"
            },
            "onHover": {
              "enable": true,
              "mode": "bubble"
            }
          },
          "modes": {
            "bubble": {
              "distance": 400,
              "duration": 0.3,
              "opacity": 1,
              "size": 4,
              "divs": {
                "distance": 200,
                "duration": 0.4,
                "mix": false,
                "selectors": []
              }
            },
            "grab": {
              "distance": 400,
              "links": {
                "opacity": 0.5
              }
            },
            "repulse": {
              "divs": {
                "distance": 200,
                "duration": 0.4,
                "factor": 100,
                "speed": 1,
                "maxSpeed": 50,
                "easing": "ease-out-quad",
                "selectors": []
              }
            }
          }
        },
        "particles": {
          "links": {
            "color": {
              "value": "#ffffff"
            },
            "distance": 500,
            "opacity": 0.4,
            "width": 2
          },
          "move": {
            "attract": {
              "rotate": {
                "x": 600,
                "y": 1200
              }
            },
            "direction": "bottom",
            "enable": true,
            "outModes": {
              "bottom": "out",
              "left": "out",
              "right": "out",
              "top": "out"
            }
          },
          "number": {
            "density": {
              "enable": true
            },
            "value": 400
          },
          "opacity": {
            "random": {
              "enable": true
            },
            "value": {
              "min": 0.1,
              "max": 0.5
            },
            "animation": {
              "speed": 1,
              "minimumValue": 0.1
            }
          },
          "size": {
            "random": {
              "enable": true
            },
            "value": {
              "min": 1,
              "max": 10
            },
            "animation": {
              "speed": 40,
              "minimumValue": 0.1
            }
          }
        }
      }}
    />
      <Outlet></Outlet>
    </section>
  )
}
