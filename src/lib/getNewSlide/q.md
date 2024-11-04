I have a js presentation app. i am not satisfied with the data-structure of the app

Briefly: 
    - I have presentation object/schema: at top level which has fields like startTime and endTime and also an array of slides
    - The slides array contain slides. we have slide.type = "Eqs" and "canvas"
    - each slide futher has an array of "items". 

here is a sample from database: please analyze and lets dicuss what problems it has



export const testData ={
  
    
    "tcode": "fbise9math",
    "chapter": 4,
    "exercise": "4.1",
    "filename": "fbise9math_ch_4_ex_4.1_q_1",
    "questionNo": 1,
    "part": null,
    "name": "",
    "questionType": "paid",
    "status": "final",
    "tags": [],
    "sortOrder": 0,
    "teacherComments": "",
    "adminComments": "fixed",
    "slides": [
      {
        "startTime": 0,
        "endTime": 3,
        "type": "canvas",
        "template": "",
        "items": [
          {
            "name": "",
            "content": "",
            "showAt": 0,
            "extra": {
              "text": {
                "initialValue": "Ch 4 Ex 4.1 Question 1",
                "setCommands": []
              },
              "x": {
                "initialValue": 160,
                "setCommands": []
              },
              "y": {
                "initialValue": 46,
                "setCommands": []
              },
              "fontSize": {
                "initialValue": 62,
                "setCommands": []
              },
              "iconSize": {
                "initialValue": 180,
                "setCommands": []
              },
              "fontFamily": "Arial",
              "icon": "📚",
              "showBg": false,
              "iconOnTop": true,
              "iconErrorX": 62,
              "iconErrorY": 0,
              "bgColor": {
                "initialValue": "gray",
                "setCommands": []
              },
              "translate": true,
              "command": "icon",
              "name": "icon_41792684",
              "color": {
                "initialValue": "red",
                "setCommands": []
              },
              "showAt": 0,
              "globalAlpha": {
                "initialValue": 1,
                "setCommands": []
              },
              "gap": {
                "initialValue": 0,
                "setCommands": []
              },
              "dash": {
                "initialValue": 0,
                "setCommands": []
              },
              "shadowOffsetX": 0,
              "shadowOffsetY": 0,
              "shadowColor": "gray",
              "shadowBlur": 0,
              "setCommands": []
            },
            "arr": [],
            "_id": {
              "$oid": "66e489a89e3a1cbb229e3c23"
            }
          }
        ],
        "slideExtra": [],
        "extra": {
          "backgroundColor": "#0512cc",
          "canvasWidth": 1000,
          "canvasHeight": 360,
          "cellHeight": 25,
          "cellWidth": 25,
          "bgImg": "system_images/bg_images/black_mat.jpg",
          "bgGlobalAlpha": 1,
          "xFactor": 0,
          "yFactor": 0,
          "showGrid": false,
          "gridLineWidth": 1,
          "gridLineColor": "gray"
        },
        "_id": {
          "$oid": "66616ef505ea063f6d27b7be"
        }
      },
      {
        "startTime": 3,
        "endTime": 257,
        "type": "Eqs",
        "template": "",
        "items": [
          {
            "name": "",
            "content": "",
            "showAt": 0,
            "extra": {
              "step": 0,
              "startTime": "3",
              "endTime": 0,
              "fsStartTime": 0,
              "fsEndTime": 0,
              "code": "Factorize the following polynomials.",
              "type": "hdg",
              "sp": [],
              "fs": [],
              "fsVisibility": false,
              "spVisibility": false,
              "color": {
                "initialValue": "gray",
                "setCommands": []
              },
              "globalAlpha": {
                "initialValue": 1,
                "setCommands": []
              },
              "gap": {
                "initialValue": 0,
                "setCommands": []
              },
              "dash": {
                "initialValue": 0,
                "setCommands": []
              }
            },
            "arr": [],
            "_id": {
              "$oid": "666171ff05ea063f6d27b801"
            }
          },
          {
            "name": "",
            "content": "",
            "showAt": 0,
            "extra": {
              "step": 1,
              "startTime": 48,
              "endTime": 0,
              "fsStartTime": 0,
              "fsEndTime": 0,
              "code": "2x^2y^3-6x^2y^2+2xy^3",
              "type": "code",
              "sp": [
                {
                  "code": "2xy^2",
                  "type": "code"
                },
                {
                  "code": "[[\"2x^2y^3\",\"2xy^2\"],[\"-6x^2y^2\",\"2xy^2\"],[\"+2xy^3\",\"2xy^2\"]]",
                  "type": "tableCode"
                }
              ],
              "fs": [],
              "spVisibility": false,
              "fsVisibility": false,
              "color": {
                "initialValue": "gray",
                "setCommands": []
              },
              "globalAlpha": {
                "initialValue": 1,
                "setCommands": []
              },
              "gap": {
                "initialValue": 0,
                "setCommands": []
              },
              "dash": {
                "initialValue": 0,
                "setCommands": []
              }
            },
            "arr": [],
            "_id": {
              "$oid": "6689f56fcec9d46b94ebd583"
            }
          },
          {
            "name": "",
            "content": "",
            "showAt": 0,
            "extra": {
              "step": 2,
              "startTime": 175,
              "endTime": 0,
              "fsStartTime": 0,
              "fsEndTime": 0,
              "code": "=2xy^2(xy-3x+y^2)",
              "type": "code",
              "sp": [
                {
                  "code": "[[\"2xy^2\",\"xy\",\"2x^2y^3\"],[\"2xy^2\",\"3x\",\"6x^2y^2\"],[\"2xy^2\",\"y^2\",\"2xy^3\"]]",
                  "type": "tableCode"
                }
              ],
              "fs": [],
              "fsVisibility": false,
              "spVisibility": false,
              "color": {
                "initialValue": "gray",
                "setCommands": []
              },
              "globalAlpha": {
                "initialValue": 1,
                "setCommands": []
              },
              "gap": {
                "initialValue": 0,
                "setCommands": []
              },
              "dash": {
                "initialValue": 0,
                "setCommands": []
              }
            },
            "arr": [],
            "_id": {
              "$oid": "666171ff05ea063f6d27b802"
            }
          }
        ],
        "slideExtra": [],
        "_id": {
          "$oid": "666171ff05ea063f6d27b800"
        }
      }
    ],
    "__v": 0,
    "soundFileType": "mp3",
    "version": "0.1"
  }