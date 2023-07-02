require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const deleteFile = require('./fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


function uploadImage(file) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            file.path,
            { folder: "images" },
            (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log("Image uploaded successfully.");
                    // Delete file from server
                    console.log(file.path);
                    deleteFile(file.path);
                    resolve(result);
                }
            }
        );
    });
}


function uploadIDs(file, callback) {
    cloudinary.uploader.upload(file.path,
        {
            folder: "images",
            ocr: "adv_ocr"
        },
        function (err, result) {
            if (err) {
                console.error(err);
                return callback(err);
            }
            console.log('Image uploaded successfully.');
            console.log(result)
            // Delete file from server
            console.log(file.path)
            deleteFile(file.path);
            callback(null, result);
        });
}

// todo: don't forget to use real upload ids function

function uploadIDsDummy(file, callback) {
    const dummy_result =
        {
            "asset_id": "1ea6a450823bf63f750e589ba9ac2fe8",
            "public_id": "images/yrykybr39tw3qq0wc5gn",
            "version": 1684772297,
            "version_id": "ca03867835ed2f27196ad703721197fd",
            "signature": "475722f19316cb91074094e0661a062f6b6adf9f",
            "width": 2322,
            "height": 4128,
            "format": "jpg",
            "resource_type": "image",
            "created_at": "2023-05-22T16:18:17Z",
            "tags": [],
            "bytes": 3230214,
            "type": "upload",
            "etag": "7309b0d40b0286c3cf2931c9b69c5910",
            "placeholder": false,
            "url": "http://res.cloudinary.com/dwnvh8vn4/image/upload/v1684772297/images/yrykybr39tw3qq0wc5gn.jpg",
            "secure_url": "https://res.cloudinary.com/dwnvh8vn4/image/upload/v1684772297/images/yrykybr39tw3qq0wc5gn.jpg",
            "folder": "images",
            "info": {
                "ocr": {
                    "adv_ocr": {
                        "status": "complete",
                        "data": [
                            {
                                "textAnnotations": [
                                    {
                                        "locale": "ar",
                                        "description": "اه\nهورية مصر العربية\nبطاقة تحقيق الشخصية\nمحمود\nمصباح عبدالحلیم نمیر\nالجمهورية\nالمحله ثان - الغربية\n۲۰۰۰۱ ۲۲ ٩٢\n٠١٤\n١٦\n۲۰۰۰/۰۱/۲۲\nGT8544189",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 214,
                                                    "y": 924
                                                },
                                                {
                                                    "x": 1980,
                                                    "y": 924
                                                },
                                                {
                                                    "x": 1980,
                                                    "y": 3557
                                                },
                                                {
                                                    "x": 214,
                                                    "y": 3557
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "اه",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1828,
                                                    "y": 3340
                                                },
                                                {
                                                    "x": 1840,
                                                    "y": 3533
                                                },
                                                {
                                                    "x": 1658,
                                                    "y": 3544
                                                },
                                                {
                                                    "x": 1646,
                                                    "y": 3350
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "هورية",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1975,
                                                    "y": 2764
                                                },
                                                {
                                                    "x": 1972,
                                                    "y": 3042
                                                },
                                                {
                                                    "x": 1765,
                                                    "y": 3041
                                                },
                                                {
                                                    "x": 1767,
                                                    "y": 2763
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "مصر",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1979,
                                                    "y": 2487
                                                },
                                                {
                                                    "x": 1978,
                                                    "y": 2713
                                                },
                                                {
                                                    "x": 1769,
                                                    "y": 2712
                                                },
                                                {
                                                    "x": 1770,
                                                    "y": 2486
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "العربية",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1981,
                                                    "y": 2081
                                                },
                                                {
                                                    "x": 1979,
                                                    "y": 2463
                                                },
                                                {
                                                    "x": 1769,
                                                    "y": 2461
                                                },
                                                {
                                                    "x": 1771,
                                                    "y": 2079
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "بطاقة",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1761,
                                                    "y": 2820
                                                },
                                                {
                                                    "x": 1761,
                                                    "y": 3007
                                                },
                                                {
                                                    "x": 1637,
                                                    "y": 3007
                                                },
                                                {
                                                    "x": 1637,
                                                    "y": 2820
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "تحقيق",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1761,
                                                    "y": 2599
                                                },
                                                {
                                                    "x": 1761,
                                                    "y": 2798
                                                },
                                                {
                                                    "x": 1637,
                                                    "y": 2798
                                                },
                                                {
                                                    "x": 1637,
                                                    "y": 2599
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "الشخصية",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1761,
                                                    "y": 2232
                                                },
                                                {
                                                    "x": 1761,
                                                    "y": 2579
                                                },
                                                {
                                                    "x": 1637,
                                                    "y": 2579
                                                },
                                                {
                                                    "x": 1637,
                                                    "y": 2232
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "محمود",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1486,
                                                    "y": 3230
                                                },
                                                {
                                                    "x": 1477,
                                                    "y": 3513
                                                },
                                                {
                                                    "x": 1393,
                                                    "y": 3510
                                                },
                                                {
                                                    "x": 1402,
                                                    "y": 3228
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "مصباح",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1335,
                                                    "y": 3203
                                                },
                                                {
                                                    "x": 1329,
                                                    "y": 3517
                                                },
                                                {
                                                    "x": 1193,
                                                    "y": 3514
                                                },
                                                {
                                                    "x": 1200,
                                                    "y": 3200
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "عبدالحلیم",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1347,
                                                    "y": 2755
                                                },
                                                {
                                                    "x": 1339,
                                                    "y": 3157
                                                },
                                                {
                                                    "x": 1201,
                                                    "y": 3154
                                                },
                                                {
                                                    "x": 1209,
                                                    "y": 2753
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "نمیر",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1349,
                                                    "y": 2539
                                                },
                                                {
                                                    "x": 1345,
                                                    "y": 2718
                                                },
                                                {
                                                    "x": 1209,
                                                    "y": 2715
                                                },
                                                {
                                                    "x": 1213,
                                                    "y": 2536
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "الجمهورية",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 1127,
                                                    "y": 3093
                                                },
                                                {
                                                    "x": 1113,
                                                    "y": 3511
                                                },
                                                {
                                                    "x": 991,
                                                    "y": 3508
                                                },
                                                {
                                                    "x": 1005,
                                                    "y": 3090
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "المحله",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 958,
                                                    "y": 3261
                                                },
                                                {
                                                    "x": 958,
                                                    "y": 3513
                                                },
                                                {
                                                    "x": 836,
                                                    "y": 3513
                                                },
                                                {
                                                    "x": 836,
                                                    "y": 3261
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "ثان",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 958,
                                                    "y": 3096
                                                },
                                                {
                                                    "x": 958,
                                                    "y": 3234
                                                },
                                                {
                                                    "x": 836,
                                                    "y": 3234
                                                },
                                                {
                                                    "x": 836,
                                                    "y": 3096
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "-",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 958,
                                                    "y": 3024
                                                },
                                                {
                                                    "x": 958,
                                                    "y": 3059
                                                },
                                                {
                                                    "x": 836,
                                                    "y": 3059
                                                },
                                                {
                                                    "x": 836,
                                                    "y": 3024
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "الغربية",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 960,
                                                    "y": 2709
                                                },
                                                {
                                                    "x": 960,
                                                    "y": 2985
                                                },
                                                {
                                                    "x": 836,
                                                    "y": 2985
                                                },
                                                {
                                                    "x": 836,
                                                    "y": 2709
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "۲۰۰۰۱",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 542,
                                                    "y": 2038
                                                },
                                                {
                                                    "x": 537,
                                                    "y": 2543
                                                },
                                                {
                                                    "x": 408,
                                                    "y": 2541
                                                },
                                                {
                                                    "x": 413,
                                                    "y": 2037
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "۲۲",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 535,
                                                    "y": 2637
                                                },
                                                {
                                                    "x": 534,
                                                    "y": 2780
                                                },
                                                {
                                                    "x": 406,
                                                    "y": 2779
                                                },
                                                {
                                                    "x": 408,
                                                    "y": 2635
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "٩٢",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 529,
                                                    "y": 3404
                                                },
                                                {
                                                    "x": 528,
                                                    "y": 3557
                                                },
                                                {
                                                    "x": 399,
                                                    "y": 3555
                                                },
                                                {
                                                    "x": 400,
                                                    "y": 3403
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "٠١٤",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 531,
                                                    "y": 3084
                                                },
                                                {
                                                    "x": 529,
                                                    "y": 3327
                                                },
                                                {
                                                    "x": 400,
                                                    "y": 3326
                                                },
                                                {
                                                    "x": 402,
                                                    "y": 3083
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "١٦",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 534,
                                                    "y": 2848
                                                },
                                                {
                                                    "x": 533,
                                                    "y": 3019
                                                },
                                                {
                                                    "x": 405,
                                                    "y": 3017
                                                },
                                                {
                                                    "x": 406,
                                                    "y": 2847
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "۲۰۰۰/۰۱/۲۲",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 631,
                                                    "y": 934
                                                },
                                                {
                                                    "x": 636,
                                                    "y": 1716
                                                },
                                                {
                                                    "x": 470,
                                                    "y": 1717
                                                },
                                                {
                                                    "x": 464,
                                                    "y": 935
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        "description": "GT8544189",
                                        "boundingPoly": {
                                            "vertices": [
                                                {
                                                    "x": 315,
                                                    "y": 924
                                                },
                                                {
                                                    "x": 310,
                                                    "y": 1624
                                                },
                                                {
                                                    "x": 215,
                                                    "y": 1623
                                                },
                                                {
                                                    "x": 221,
                                                    "y": 922
                                                }
                                            ]
                                        }
                                    }
                                ],
                                "fullTextAnnotation": {
                                    "pages": [
                                        {
                                            "property": {
                                                "detectedLanguages": [
                                                    {
                                                        "languageCode": "ar",
                                                        "confidence": 0.5424665
                                                    },
                                                    {
                                                        "languageCode": "fa",
                                                        "confidence": 0.16413654
                                                    },
                                                    {
                                                        "languageCode": "en",
                                                        "confidence": 0.08318476
                                                    }
                                                ]
                                            },
                                            "width": 1800,
                                            "height": 3200,
                                            "blocks": [
                                                {
                                                    "boundingBox": {
                                                        "vertices": [
                                                            {
                                                                "x": 1417,
                                                                "y": 2589
                                                            },
                                                            {
                                                                "x": 1426,
                                                                "y": 2739
                                                            },
                                                            {
                                                                "x": 1285,
                                                                "y": 2747
                                                            },
                                                            {
                                                                "x": 1276,
                                                                "y": 2597
                                                            }
                                                        ]
                                                    },
                                                    "paragraphs": [
                                                        {
                                                            "boundingBox": {
                                                                "vertices": [
                                                                    {
                                                                        "x": 1417,
                                                                        "y": 2589
                                                                    },
                                                                    {
                                                                        "x": 1426,
                                                                        "y": 2739
                                                                    },
                                                                    {
                                                                        "x": 1285,
                                                                        "y": 2747
                                                                    },
                                                                    {
                                                                        "x": 1276,
                                                                        "y": 2597
                                                                    }
                                                                ]
                                                            },
                                                            "words": [
                                                                {
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 1417,
                                                                                "y": 2589
                                                                            },
                                                                            {
                                                                                "x": 1426,
                                                                                "y": 2739
                                                                            },
                                                                            {
                                                                                "x": 1285,
                                                                                "y": 2747
                                                                            },
                                                                            {
                                                                                "x": 1276,
                                                                                "y": 2597
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1420,
                                                                                        "y": 2648
                                                                                    },
                                                                                    {
                                                                                        "x": 1425,
                                                                                        "y": 2739
                                                                                    },
                                                                                    {
                                                                                        "x": 1286,
                                                                                        "y": 2747
                                                                                    },
                                                                                    {
                                                                                        "x": 1280,
                                                                                        "y": 2656
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ا"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "LINE_BREAK"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1417,
                                                                                        "y": 2589
                                                                                    },
                                                                                    {
                                                                                        "x": 1419,
                                                                                        "y": 2628
                                                                                    },
                                                                                    {
                                                                                        "x": 1280,
                                                                                        "y": 2636
                                                                                    },
                                                                                    {
                                                                                        "x": 1277,
                                                                                        "y": 2597
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ه"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "blockType": "TEXT"
                                                },
                                                {
                                                    "boundingBox": {
                                                        "vertices": [
                                                            {
                                                                "x": 1536,
                                                                "y": 1612
                                                            },
                                                            {
                                                                "x": 1533,
                                                                "y": 2358
                                                            },
                                                            {
                                                                "x": 1267,
                                                                "y": 2357
                                                            },
                                                            {
                                                                "x": 1270,
                                                                "y": 1611
                                                            }
                                                        ]
                                                    },
                                                    "paragraphs": [
                                                        {
                                                            "boundingBox": {
                                                                "vertices": [
                                                                    {
                                                                        "x": 1536,
                                                                        "y": 1613
                                                                    },
                                                                    {
                                                                        "x": 1530,
                                                                        "y": 2358
                                                                    },
                                                                    {
                                                                        "x": 1367,
                                                                        "y": 2357
                                                                    },
                                                                    {
                                                                        "x": 1373,
                                                                        "y": 1612
                                                                    }
                                                                ]
                                                            },
                                                            "words": [
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 1531,
                                                                                "y": 2143
                                                                            },
                                                                            {
                                                                                "x": 1529,
                                                                                "y": 2358
                                                                            },
                                                                            {
                                                                                "x": 1368,
                                                                                "y": 2357
                                                                            },
                                                                            {
                                                                                "x": 1370,
                                                                                "y": 2142
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1530,
                                                                                        "y": 2330
                                                                                    },
                                                                                    {
                                                                                        "x": 1530,
                                                                                        "y": 2358
                                                                                    },
                                                                                    {
                                                                                        "x": 1369,
                                                                                        "y": 2357
                                                                                    },
                                                                                    {
                                                                                        "x": 1369,
                                                                                        "y": 2329
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ه"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1531,
                                                                                        "y": 2260
                                                                                    },
                                                                                    {
                                                                                        "x": 1531,
                                                                                        "y": 2302
                                                                                    },
                                                                                    {
                                                                                        "x": 1370,
                                                                                        "y": 2301
                                                                                    },
                                                                                    {
                                                                                        "x": 1370,
                                                                                        "y": 2259
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "و"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1531,
                                                                                        "y": 2215
                                                                                    },
                                                                                    {
                                                                                        "x": 1531,
                                                                                        "y": 2252
                                                                                    },
                                                                                    {
                                                                                        "x": 1370,
                                                                                        "y": 2251
                                                                                    },
                                                                                    {
                                                                                        "x": 1370,
                                                                                        "y": 2214
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ر"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1531,
                                                                                        "y": 2170
                                                                                    },
                                                                                    {
                                                                                        "x": 1531,
                                                                                        "y": 2202
                                                                                    },
                                                                                    {
                                                                                        "x": 1370,
                                                                                        "y": 2201
                                                                                    },
                                                                                    {
                                                                                        "x": 1370,
                                                                                        "y": 2169
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ي"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1531,
                                                                                        "y": 2143
                                                                                    },
                                                                                    {
                                                                                        "x": 1531,
                                                                                        "y": 2164
                                                                                    },
                                                                                    {
                                                                                        "x": 1370,
                                                                                        "y": 2163
                                                                                    },
                                                                                    {
                                                                                        "x": 1370,
                                                                                        "y": 2142
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ة"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 1534,
                                                                                "y": 1928
                                                                            },
                                                                            {
                                                                                "x": 1533,
                                                                                "y": 2103
                                                                            },
                                                                            {
                                                                                "x": 1371,
                                                                                "y": 2102
                                                                            },
                                                                            {
                                                                                "x": 1372,
                                                                                "y": 1927
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1532,
                                                                                        "y": 2077
                                                                                    },
                                                                                    {
                                                                                        "x": 1532,
                                                                                        "y": 2103
                                                                                    },
                                                                                    {
                                                                                        "x": 1371,
                                                                                        "y": 2102
                                                                                    },
                                                                                    {
                                                                                        "x": 1371,
                                                                                        "y": 2076
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "م"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1533,
                                                                                        "y": 2000
                                                                                    },
                                                                                    {
                                                                                        "x": 1533,
                                                                                        "y": 2054
                                                                                    },
                                                                                    {
                                                                                        "x": 1372,
                                                                                        "y": 2053
                                                                                    },
                                                                                    {
                                                                                        "x": 1372,
                                                                                        "y": 1999
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ص"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1533,
                                                                                        "y": 1928
                                                                                    },
                                                                                    {
                                                                                        "x": 1533,
                                                                                        "y": 1968
                                                                                    },
                                                                                    {
                                                                                        "x": 1372,
                                                                                        "y": 1967
                                                                                    },
                                                                                    {
                                                                                        "x": 1372,
                                                                                        "y": 1927
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ر"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 1536,
                                                                                "y": 1613
                                                                            },
                                                                            {
                                                                                "x": 1534,
                                                                                "y": 1909
                                                                            },
                                                                            {
                                                                                "x": 1371,
                                                                                "y": 1908
                                                                            },
                                                                            {
                                                                                "x": 1373,
                                                                                "y": 1612
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1533,
                                                                                        "y": 1892
                                                                                    },
                                                                                    {
                                                                                        "x": 1533,
                                                                                        "y": 1909
                                                                                    },
                                                                                    {
                                                                                        "x": 1372,
                                                                                        "y": 1908
                                                                                    },
                                                                                    {
                                                                                        "x": 1372,
                                                                                        "y": 1891
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ا"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1534,
                                                                                        "y": 1851
                                                                                    },
                                                                                    {
                                                                                        "x": 1534,
                                                                                        "y": 1886
                                                                                    },
                                                                                    {
                                                                                        "x": 1373,
                                                                                        "y": 1885
                                                                                    },
                                                                                    {
                                                                                        "x": 1373,
                                                                                        "y": 1850
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ل"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1534,
                                                                                        "y": 1786
                                                                                    },
                                                                                    {
                                                                                        "x": 1534,
                                                                                        "y": 1824
                                                                                    },
                                                                                    {
                                                                                        "x": 1373,
                                                                                        "y": 1823
                                                                                    },
                                                                                    {
                                                                                        "x": 1373,
                                                                                        "y": 1785
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ع"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1534,
                                                                                        "y": 1761
                                                                                    },
                                                                                    {
                                                                                        "x": 1534,
                                                                                        "y": 1786
                                                                                    },
                                                                                    {
                                                                                        "x": 1373,
                                                                                        "y": 1785
                                                                                    },
                                                                                    {
                                                                                        "x": 1373,
                                                                                        "y": 1760
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ر"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1535,
                                                                                        "y": 1727
                                                                                    },
                                                                                    {
                                                                                        "x": 1535,
                                                                                        "y": 1755
                                                                                    },
                                                                                    {
                                                                                        "x": 1374,
                                                                                        "y": 1754
                                                                                    },
                                                                                    {
                                                                                        "x": 1374,
                                                                                        "y": 1726
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ب"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1535,
                                                                                        "y": 1673
                                                                                    },
                                                                                    {
                                                                                        "x": 1535,
                                                                                        "y": 1716
                                                                                    },
                                                                                    {
                                                                                        "x": 1374,
                                                                                        "y": 1715
                                                                                    },
                                                                                    {
                                                                                        "x": 1374,
                                                                                        "y": 1672
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ي"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "LINE_BREAK"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1536,
                                                                                        "y": 1613
                                                                                    },
                                                                                    {
                                                                                        "x": 1536,
                                                                                        "y": 1647
                                                                                    },
                                                                                    {
                                                                                        "x": 1375,
                                                                                        "y": 1646
                                                                                    },
                                                                                    {
                                                                                        "x": 1375,
                                                                                        "y": 1612
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ة"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "boundingBox": {
                                                                "vertices": [
                                                                    {
                                                                        "x": 1365,
                                                                        "y": 1730
                                                                    },
                                                                    {
                                                                        "x": 1364,
                                                                        "y": 2331
                                                                    },
                                                                    {
                                                                        "x": 1268,
                                                                        "y": 2331
                                                                    },
                                                                    {
                                                                        "x": 1269,
                                                                        "y": 1730
                                                                    }
                                                                ]
                                                            },
                                                            "words": [
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 1365,
                                                                                "y": 2186
                                                                            },
                                                                            {
                                                                                "x": 1365,
                                                                                "y": 2331
                                                                            },
                                                                            {
                                                                                "x": 1269,
                                                                                "y": 2331
                                                                            },
                                                                            {
                                                                                "x": 1269,
                                                                                "y": 2186
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2317
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2331
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2331
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2317
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ب"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2284
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2309
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2309
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2284
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ط"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2244
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2270
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2270
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2244
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ا"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2216
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2238
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2238
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2216
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ق"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2186
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2210
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2210
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2186
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ة"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 1365,
                                                                                "y": 2015
                                                                            },
                                                                            {
                                                                                "x": 1365,
                                                                                "y": 2169
                                                                            },
                                                                            {
                                                                                "x": 1269,
                                                                                "y": 2169
                                                                            },
                                                                            {
                                                                                "x": 1269,
                                                                                "y": 2015
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2143
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2169
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2169
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2143
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ت"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2130
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2144
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2144
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2130
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ح"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2097
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2119
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2119
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2097
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ق"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2066
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2088
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2088
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2066
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ي"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2015
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 2060
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2060
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 2015
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ق"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 1365,
                                                                                "y": 1730
                                                                            },
                                                                            {
                                                                                "x": 1365,
                                                                                "y": 1999
                                                                            },
                                                                            {
                                                                                "x": 1269,
                                                                                "y": 1999
                                                                            },
                                                                            {
                                                                                "x": 1269,
                                                                                "y": 1730
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1988
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1999
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1999
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1988
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ا"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1958
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1978
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1978
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1958
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ل"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1924
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1955
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1955
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1924
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ش"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1860
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1899
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1899
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1860
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "خ"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1809
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1849
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1849
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1809
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ص"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1754
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1787
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1787
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1754
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ي"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "LINE_BREAK"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1730
                                                                                    },
                                                                                    {
                                                                                        "x": 1365,
                                                                                        "y": 1753
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1753
                                                                                    },
                                                                                    {
                                                                                        "x": 1269,
                                                                                        "y": 1730
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ة"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "blockType": "TEXT"
                                                },
                                                {
                                                    "boundingBox": {
                                                        "vertices": [
                                                            {
                                                                "x": 1166,
                                                                "y": 1971
                                                            },
                                                            {
                                                                "x": 1146,
                                                                "y": 2730
                                                            },
                                                            {
                                                                "x": 920,
                                                                "y": 2724
                                                            },
                                                            {
                                                                "x": 940,
                                                                "y": 1965
                                                            }
                                                        ]
                                                    },
                                                    "paragraphs": [
                                                        {
                                                            "boundingBox": {
                                                                "vertices": [
                                                                    {
                                                                        "x": 1152,
                                                                        "y": 2504
                                                                    },
                                                                    {
                                                                        "x": 1145,
                                                                        "y": 2723
                                                                    },
                                                                    {
                                                                        "x": 1080,
                                                                        "y": 2721
                                                                    },
                                                                    {
                                                                        "x": 1087,
                                                                        "y": 2502
                                                                    }
                                                                ]
                                                            },
                                                            "words": [
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 1152,
                                                                                "y": 2504
                                                                            },
                                                                            {
                                                                                "x": 1145,
                                                                                "y": 2723
                                                                            },
                                                                            {
                                                                                "x": 1080,
                                                                                "y": 2721
                                                                            },
                                                                            {
                                                                                "x": 1087,
                                                                                "y": 2502
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1146,
                                                                                        "y": 2690
                                                                                    },
                                                                                    {
                                                                                        "x": 1145,
                                                                                        "y": 2723
                                                                                    },
                                                                                    {
                                                                                        "x": 1081,
                                                                                        "y": 2721
                                                                                    },
                                                                                    {
                                                                                        "x": 1082,
                                                                                        "y": 2688
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "م"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1147,
                                                                                        "y": 2636
                                                                                    },
                                                                                    {
                                                                                        "x": 1146,
                                                                                        "y": 2671
                                                                                    },
                                                                                    {
                                                                                        "x": 1082,
                                                                                        "y": 2669
                                                                                    },
                                                                                    {
                                                                                        "x": 1083,
                                                                                        "y": 2634
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ح"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1149,
                                                                                        "y": 2593
                                                                                    },
                                                                                    {
                                                                                        "x": 1148,
                                                                                        "y": 2623
                                                                                    },
                                                                                    {
                                                                                        "x": 1084,
                                                                                        "y": 2621
                                                                                    },
                                                                                    {
                                                                                        "x": 1085,
                                                                                        "y": 2591
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "م"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1150,
                                                                                        "y": 2556
                                                                                    },
                                                                                    {
                                                                                        "x": 1149,
                                                                                        "y": 2584
                                                                                    },
                                                                                    {
                                                                                        "x": 1085,
                                                                                        "y": 2582
                                                                                    },
                                                                                    {
                                                                                        "x": 1086,
                                                                                        "y": 2554
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "و"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "LINE_BREAK"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1152,
                                                                                        "y": 2504
                                                                                    },
                                                                                    {
                                                                                        "x": 1151,
                                                                                        "y": 2544
                                                                                    },
                                                                                    {
                                                                                        "x": 1087,
                                                                                        "y": 2542
                                                                                    },
                                                                                    {
                                                                                        "x": 1088,
                                                                                        "y": 2502
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "د"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "boundingBox": {
                                                                "vertices": [
                                                                    {
                                                                        "x": 1048,
                                                                        "y": 1968
                                                                    },
                                                                    {
                                                                        "x": 1033,
                                                                        "y": 2726
                                                                    },
                                                                    {
                                                                        "x": 925,
                                                                        "y": 2724
                                                                    },
                                                                    {
                                                                        "x": 940,
                                                                        "y": 1966
                                                                    }
                                                                ]
                                                            },
                                                            "words": [
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "fa",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 1035,
                                                                                "y": 2483
                                                                            },
                                                                            {
                                                                                "x": 1030,
                                                                                "y": 2726
                                                                            },
                                                                            {
                                                                                "x": 925,
                                                                                "y": 2724
                                                                            },
                                                                            {
                                                                                "x": 930,
                                                                                "y": 2481
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1031,
                                                                                        "y": 2695
                                                                                    },
                                                                                    {
                                                                                        "x": 1030,
                                                                                        "y": 2726
                                                                                    },
                                                                                    {
                                                                                        "x": 925,
                                                                                        "y": 2724
                                                                                    },
                                                                                    {
                                                                                        "x": 926,
                                                                                        "y": 2693
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "م"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1032,
                                                                                        "y": 2640
                                                                                    },
                                                                                    {
                                                                                        "x": 1031,
                                                                                        "y": 2683
                                                                                    },
                                                                                    {
                                                                                        "x": 926,
                                                                                        "y": 2681
                                                                                    },
                                                                                    {
                                                                                        "x": 927,
                                                                                        "y": 2638
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ص"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1033,
                                                                                        "y": 2570
                                                                                    },
                                                                                    {
                                                                                        "x": 1032,
                                                                                        "y": 2611
                                                                                    },
                                                                                    {
                                                                                        "x": 927,
                                                                                        "y": 2609
                                                                                    },
                                                                                    {
                                                                                        "x": 928,
                                                                                        "y": 2568
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ب"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1034,
                                                                                        "y": 2540
                                                                                    },
                                                                                    {
                                                                                        "x": 1033,
                                                                                        "y": 2569
                                                                                    },
                                                                                    {
                                                                                        "x": 928,
                                                                                        "y": 2567
                                                                                    },
                                                                                    {
                                                                                        "x": 929,
                                                                                        "y": 2538
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ا"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1035,
                                                                                        "y": 2483
                                                                                    },
                                                                                    {
                                                                                        "x": 1034,
                                                                                        "y": 2526
                                                                                    },
                                                                                    {
                                                                                        "x": 929,
                                                                                        "y": 2524
                                                                                    },
                                                                                    {
                                                                                        "x": 930,
                                                                                        "y": 2481
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ح"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "fa",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 1044,
                                                                                "y": 2136
                                                                            },
                                                                            {
                                                                                "x": 1038,
                                                                                "y": 2447
                                                                            },
                                                                            {
                                                                                "x": 931,
                                                                                "y": 2445
                                                                            },
                                                                            {
                                                                                "x": 937,
                                                                                "y": 2134
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1037,
                                                                                        "y": 2412
                                                                                    },
                                                                                    {
                                                                                        "x": 1036,
                                                                                        "y": 2447
                                                                                    },
                                                                                    {
                                                                                        "x": 931,
                                                                                        "y": 2445
                                                                                    },
                                                                                    {
                                                                                        "x": 932,
                                                                                        "y": 2410
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ع"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1037,
                                                                                        "y": 2378
                                                                                    },
                                                                                    {
                                                                                        "x": 1037,
                                                                                        "y": 2401
                                                                                    },
                                                                                    {
                                                                                        "x": 932,
                                                                                        "y": 2399
                                                                                    },
                                                                                    {
                                                                                        "x": 932,
                                                                                        "y": 2376
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ب"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1038,
                                                                                        "y": 2354
                                                                                    },
                                                                                    {
                                                                                        "x": 1038,
                                                                                        "y": 2376
                                                                                    },
                                                                                    {
                                                                                        "x": 933,
                                                                                        "y": 2374
                                                                                    },
                                                                                    {
                                                                                        "x": 933,
                                                                                        "y": 2352
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "د"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1039,
                                                                                        "y": 2316
                                                                                    },
                                                                                    {
                                                                                        "x": 1038,
                                                                                        "y": 2343
                                                                                    },
                                                                                    {
                                                                                        "x": 933,
                                                                                        "y": 2341
                                                                                    },
                                                                                    {
                                                                                        "x": 934,
                                                                                        "y": 2314
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ا"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1039,
                                                                                        "y": 2281
                                                                                    },
                                                                                    {
                                                                                        "x": 1038,
                                                                                        "y": 2308
                                                                                    },
                                                                                    {
                                                                                        "x": 933,
                                                                                        "y": 2306
                                                                                    },
                                                                                    {
                                                                                        "x": 934,
                                                                                        "y": 2279
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ل"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1040,
                                                                                        "y": 2245
                                                                                    },
                                                                                    {
                                                                                        "x": 1039,
                                                                                        "y": 2272
                                                                                    },
                                                                                    {
                                                                                        "x": 934,
                                                                                        "y": 2270
                                                                                    },
                                                                                    {
                                                                                        "x": 935,
                                                                                        "y": 2243
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ح"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1041,
                                                                                        "y": 2209
                                                                                    },
                                                                                    {
                                                                                        "x": 1040,
                                                                                        "y": 2236
                                                                                    },
                                                                                    {
                                                                                        "x": 935,
                                                                                        "y": 2234
                                                                                    },
                                                                                    {
                                                                                        "x": 936,
                                                                                        "y": 2207
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ل"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1041,
                                                                                        "y": 2174
                                                                                    },
                                                                                    {
                                                                                        "x": 1040,
                                                                                        "y": 2200
                                                                                    },
                                                                                    {
                                                                                        "x": 935,
                                                                                        "y": 2198
                                                                                    },
                                                                                    {
                                                                                        "x": 936,
                                                                                        "y": 2172
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ی"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1042,
                                                                                        "y": 2136
                                                                                    },
                                                                                    {
                                                                                        "x": 1041,
                                                                                        "y": 2167
                                                                                    },
                                                                                    {
                                                                                        "x": 936,
                                                                                        "y": 2165
                                                                                    },
                                                                                    {
                                                                                        "x": 937,
                                                                                        "y": 2134
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "م"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "fa",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 1046,
                                                                                "y": 1968
                                                                            },
                                                                            {
                                                                                "x": 1043,
                                                                                "y": 2107
                                                                            },
                                                                            {
                                                                                "x": 937,
                                                                                "y": 2105
                                                                            },
                                                                            {
                                                                                "x": 940,
                                                                                "y": 1966
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1043,
                                                                                        "y": 2081
                                                                                    },
                                                                                    {
                                                                                        "x": 1042,
                                                                                        "y": 2107
                                                                                    },
                                                                                    {
                                                                                        "x": 937,
                                                                                        "y": 2105
                                                                                    },
                                                                                    {
                                                                                        "x": 938,
                                                                                        "y": 2079
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ن"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1044,
                                                                                        "y": 2042
                                                                                    },
                                                                                    {
                                                                                        "x": 1043,
                                                                                        "y": 2070
                                                                                    },
                                                                                    {
                                                                                        "x": 938,
                                                                                        "y": 2068
                                                                                    },
                                                                                    {
                                                                                        "x": 939,
                                                                                        "y": 2040
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "م"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1045,
                                                                                        "y": 2009
                                                                                    },
                                                                                    {
                                                                                        "x": 1045,
                                                                                        "y": 2032
                                                                                    },
                                                                                    {
                                                                                        "x": 940,
                                                                                        "y": 2030
                                                                                    },
                                                                                    {
                                                                                        "x": 940,
                                                                                        "y": 2007
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ی"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "LINE_BREAK"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 1045,
                                                                                        "y": 1968
                                                                                    },
                                                                                    {
                                                                                        "x": 1044,
                                                                                        "y": 2007
                                                                                    },
                                                                                    {
                                                                                        "x": 939,
                                                                                        "y": 2005
                                                                                    },
                                                                                    {
                                                                                        "x": 940,
                                                                                        "y": 1966
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ر"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "blockType": "TEXT"
                                                },
                                                {
                                                    "boundingBox": {
                                                        "vertices": [
                                                            {
                                                                "x": 879,
                                                                "y": 2102
                                                            },
                                                            {
                                                                "x": 868,
                                                                "y": 2726
                                                            },
                                                            {
                                                                "x": 637,
                                                                "y": 2722
                                                            },
                                                            {
                                                                "x": 648,
                                                                "y": 2098
                                                            }
                                                        ]
                                                    },
                                                    "paragraphs": [
                                                        {
                                                            "boundingBox": {
                                                                "vertices": [
                                                                    {
                                                                        "x": 874,
                                                                        "y": 2398
                                                                    },
                                                                    {
                                                                        "x": 863,
                                                                        "y": 2722
                                                                    },
                                                                    {
                                                                        "x": 768,
                                                                        "y": 2719
                                                                    },
                                                                    {
                                                                        "x": 779,
                                                                        "y": 2395
                                                                    }
                                                                ]
                                                            },
                                                            "words": [
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 874,
                                                                                "y": 2398
                                                                            },
                                                                            {
                                                                                "x": 863,
                                                                                "y": 2722
                                                                            },
                                                                            {
                                                                                "x": 768,
                                                                                "y": 2719
                                                                            },
                                                                            {
                                                                                "x": 779,
                                                                                "y": 2395
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 863,
                                                                                        "y": 2714
                                                                                    },
                                                                                    {
                                                                                        "x": 863,
                                                                                        "y": 2722
                                                                                    },
                                                                                    {
                                                                                        "x": 769,
                                                                                        "y": 2719
                                                                                    },
                                                                                    {
                                                                                        "x": 769,
                                                                                        "y": 2711
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ا"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 864,
                                                                                        "y": 2679
                                                                                    },
                                                                                    {
                                                                                        "x": 863,
                                                                                        "y": 2704
                                                                                    },
                                                                                    {
                                                                                        "x": 769,
                                                                                        "y": 2701
                                                                                    },
                                                                                    {
                                                                                        "x": 770,
                                                                                        "y": 2676
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ل"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 865,
                                                                                        "y": 2648
                                                                                    },
                                                                                    {
                                                                                        "x": 864,
                                                                                        "y": 2671
                                                                                    },
                                                                                    {
                                                                                        "x": 770,
                                                                                        "y": 2668
                                                                                    },
                                                                                    {
                                                                                        "x": 771,
                                                                                        "y": 2645
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ج"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 866,
                                                                                        "y": 2611
                                                                                    },
                                                                                    {
                                                                                        "x": 865,
                                                                                        "y": 2643
                                                                                    },
                                                                                    {
                                                                                        "x": 771,
                                                                                        "y": 2640
                                                                                    },
                                                                                    {
                                                                                        "x": 772,
                                                                                        "y": 2608
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "م"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 868,
                                                                                        "y": 2555
                                                                                    },
                                                                                    {
                                                                                        "x": 867,
                                                                                        "y": 2588
                                                                                    },
                                                                                    {
                                                                                        "x": 773,
                                                                                        "y": 2585
                                                                                    },
                                                                                    {
                                                                                        "x": 774,
                                                                                        "y": 2552
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ه"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 869,
                                                                                        "y": 2525
                                                                                    },
                                                                                    {
                                                                                        "x": 868,
                                                                                        "y": 2553
                                                                                    },
                                                                                    {
                                                                                        "x": 774,
                                                                                        "y": 2550
                                                                                    },
                                                                                    {
                                                                                        "x": 775,
                                                                                        "y": 2522
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "و"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 871,
                                                                                        "y": 2480
                                                                                    },
                                                                                    {
                                                                                        "x": 870,
                                                                                        "y": 2509
                                                                                    },
                                                                                    {
                                                                                        "x": 776,
                                                                                        "y": 2506
                                                                                    },
                                                                                    {
                                                                                        "x": 777,
                                                                                        "y": 2477
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ر"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 872,
                                                                                        "y": 2448
                                                                                    },
                                                                                    {
                                                                                        "x": 871,
                                                                                        "y": 2475
                                                                                    },
                                                                                    {
                                                                                        "x": 777,
                                                                                        "y": 2472
                                                                                    },
                                                                                    {
                                                                                        "x": 778,
                                                                                        "y": 2445
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ي"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "LINE_BREAK"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 873,
                                                                                        "y": 2398
                                                                                    },
                                                                                    {
                                                                                        "x": 872,
                                                                                        "y": 2436
                                                                                    },
                                                                                    {
                                                                                        "x": 778,
                                                                                        "y": 2433
                                                                                    },
                                                                                    {
                                                                                        "x": 779,
                                                                                        "y": 2395
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ة"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "boundingBox": {
                                                                "vertices": [
                                                                    {
                                                                        "x": 744,
                                                                        "y": 2100
                                                                    },
                                                                    {
                                                                        "x": 743,
                                                                        "y": 2723
                                                                    },
                                                                    {
                                                                        "x": 647,
                                                                        "y": 2723
                                                                    },
                                                                    {
                                                                        "x": 648,
                                                                        "y": 2100
                                                                    }
                                                                ]
                                                            },
                                                            "words": [
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 743,
                                                                                "y": 2528
                                                                            },
                                                                            {
                                                                                "x": 743,
                                                                                "y": 2723
                                                                            },
                                                                            {
                                                                                "x": 648,
                                                                                "y": 2723
                                                                            },
                                                                            {
                                                                                "x": 648,
                                                                                "y": 2528
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2717
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2723
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2723
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2717
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ا"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2691
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2712
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2712
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2691
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ل"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2650
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2681
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2681
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2650
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "م"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2601
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2633
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2633
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2601
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ح"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2568
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2594
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2594
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2568
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ل"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2528
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2561
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2561
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2528
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ه"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 743,
                                                                                "y": 2400
                                                                            },
                                                                            {
                                                                                "x": 743,
                                                                                "y": 2507
                                                                            },
                                                                            {
                                                                                "x": 648,
                                                                                "y": 2507
                                                                            },
                                                                            {
                                                                                "x": 648,
                                                                                "y": 2400
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2485
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2507
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2507
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2485
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ث"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2450
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2473
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2473
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2450
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ا"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2400
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2448
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2448
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2400
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ن"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 743,
                                                                                "y": 2344
                                                                            },
                                                                            {
                                                                                "x": 743,
                                                                                "y": 2371
                                                                            },
                                                                            {
                                                                                "x": 648,
                                                                                "y": 2371
                                                                            },
                                                                            {
                                                                                "x": 648,
                                                                                "y": 2344
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2344
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2371
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2371
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2344
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "-"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "ar",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 744,
                                                                                "y": 2100
                                                                            },
                                                                            {
                                                                                "x": 744,
                                                                                "y": 2314
                                                                            },
                                                                            {
                                                                                "x": 648,
                                                                                "y": 2314
                                                                            },
                                                                            {
                                                                                "x": 648,
                                                                                "y": 2100
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2297
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2314
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2314
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2297
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ا"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2269
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2292
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2292
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2269
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ل"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2233
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2256
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2256
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2233
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "غ"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2209
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2232
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2232
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2209
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ر"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2173
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2196
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2196
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2173
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ب"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2148
                                                                                    },
                                                                                    {
                                                                                        "x": 743,
                                                                                        "y": 2173
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2173
                                                                                    },
                                                                                    {
                                                                                        "x": 648,
                                                                                        "y": 2148
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ي"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "LINE_BREAK"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 744,
                                                                                        "y": 2100
                                                                                    },
                                                                                    {
                                                                                        "x": 744,
                                                                                        "y": 2133
                                                                                    },
                                                                                    {
                                                                                        "x": 649,
                                                                                        "y": 2133
                                                                                    },
                                                                                    {
                                                                                        "x": 649,
                                                                                        "y": 2100
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "ة"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "blockType": "TEXT"
                                                },
                                                {
                                                    "boundingBox": {
                                                        "vertices": [
                                                            {
                                                                "x": 420,
                                                                "y": 1580
                                                            },
                                                            {
                                                                "x": 409,
                                                                "y": 2757
                                                            },
                                                            {
                                                                "x": 309,
                                                                "y": 2756
                                                            },
                                                            {
                                                                "x": 320,
                                                                "y": 1579
                                                            }
                                                        ]
                                                    },
                                                    "paragraphs": [
                                                        {
                                                            "boundingBox": {
                                                                "vertices": [
                                                                    {
                                                                        "x": 420,
                                                                        "y": 1580
                                                                    },
                                                                    {
                                                                        "x": 409,
                                                                        "y": 2757
                                                                    },
                                                                    {
                                                                        "x": 309,
                                                                        "y": 2756
                                                                    },
                                                                    {
                                                                        "x": 320,
                                                                        "y": 1579
                                                                    }
                                                                ]
                                                            },
                                                            "words": [
                                                                {
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 420,
                                                                                "y": 1580
                                                                            },
                                                                            {
                                                                                "x": 416,
                                                                                "y": 1971
                                                                            },
                                                                            {
                                                                                "x": 316,
                                                                                "y": 1970
                                                                            },
                                                                            {
                                                                                "x": 320,
                                                                                "y": 1579
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 419,
                                                                                        "y": 1580
                                                                                    },
                                                                                    {
                                                                                        "x": 419,
                                                                                        "y": 1631
                                                                                    },
                                                                                    {
                                                                                        "x": 320,
                                                                                        "y": 1630
                                                                                    },
                                                                                    {
                                                                                        "x": 320,
                                                                                        "y": 1579
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۲"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 418,
                                                                                        "y": 1700
                                                                                    },
                                                                                    {
                                                                                        "x": 418,
                                                                                        "y": 1719
                                                                                    },
                                                                                    {
                                                                                        "x": 319,
                                                                                        "y": 1718
                                                                                    },
                                                                                    {
                                                                                        "x": 319,
                                                                                        "y": 1699
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۰"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 418,
                                                                                        "y": 1768
                                                                                    },
                                                                                    {
                                                                                        "x": 418,
                                                                                        "y": 1791
                                                                                    },
                                                                                    {
                                                                                        "x": 319,
                                                                                        "y": 1790
                                                                                    },
                                                                                    {
                                                                                        "x": 319,
                                                                                        "y": 1767
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۰"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 417,
                                                                                        "y": 1876
                                                                                    },
                                                                                    {
                                                                                        "x": 417,
                                                                                        "y": 1895
                                                                                    },
                                                                                    {
                                                                                        "x": 318,
                                                                                        "y": 1894
                                                                                    },
                                                                                    {
                                                                                        "x": 318,
                                                                                        "y": 1875
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۰"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 416,
                                                                                        "y": 1944
                                                                                    },
                                                                                    {
                                                                                        "x": 416,
                                                                                        "y": 1971
                                                                                    },
                                                                                    {
                                                                                        "x": 317,
                                                                                        "y": 1970
                                                                                    },
                                                                                    {
                                                                                        "x": 317,
                                                                                        "y": 1943
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۱"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 415,
                                                                                "y": 2044
                                                                            },
                                                                            {
                                                                                "x": 414,
                                                                                "y": 2155
                                                                            },
                                                                            {
                                                                                "x": 315,
                                                                                "y": 2154
                                                                            },
                                                                            {
                                                                                "x": 316,
                                                                                "y": 2043
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 415,
                                                                                        "y": 2044
                                                                                    },
                                                                                    {
                                                                                        "x": 415,
                                                                                        "y": 2083
                                                                                    },
                                                                                    {
                                                                                        "x": 316,
                                                                                        "y": 2082
                                                                                    },
                                                                                    {
                                                                                        "x": 316,
                                                                                        "y": 2043
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۲"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 414,
                                                                                        "y": 2112
                                                                                    },
                                                                                    {
                                                                                        "x": 414,
                                                                                        "y": 2155
                                                                                    },
                                                                                    {
                                                                                        "x": 315,
                                                                                        "y": 2154
                                                                                    },
                                                                                    {
                                                                                        "x": 315,
                                                                                        "y": 2111
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۲"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 410,
                                                                                "y": 2639
                                                                            },
                                                                            {
                                                                                "x": 409,
                                                                                "y": 2757
                                                                            },
                                                                            {
                                                                                "x": 309,
                                                                                "y": 2756
                                                                            },
                                                                            {
                                                                                "x": 310,
                                                                                "y": 2638
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 409,
                                                                                        "y": 2639
                                                                                    },
                                                                                    {
                                                                                        "x": 408,
                                                                                        "y": 2696
                                                                                    },
                                                                                    {
                                                                                        "x": 309,
                                                                                        "y": 2695
                                                                                    },
                                                                                    {
                                                                                        "x": 310,
                                                                                        "y": 2638
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "٩"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "EOL_SURE_SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 409,
                                                                                        "y": 2720
                                                                                    },
                                                                                    {
                                                                                        "x": 409,
                                                                                        "y": 2757
                                                                                    },
                                                                                    {
                                                                                        "x": 310,
                                                                                        "y": 2756
                                                                                    },
                                                                                    {
                                                                                        "x": 310,
                                                                                        "y": 2719
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "٢"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 412,
                                                                                "y": 2391
                                                                            },
                                                                            {
                                                                                "x": 410,
                                                                                "y": 2579
                                                                            },
                                                                            {
                                                                                "x": 310,
                                                                                "y": 2578
                                                                            },
                                                                            {
                                                                                "x": 312,
                                                                                "y": 2390
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 412,
                                                                                        "y": 2391
                                                                                    },
                                                                                    {
                                                                                        "x": 411,
                                                                                        "y": 2448
                                                                                    },
                                                                                    {
                                                                                        "x": 312,
                                                                                        "y": 2447
                                                                                    },
                                                                                    {
                                                                                        "x": 313,
                                                                                        "y": 2390
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "٠"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 411,
                                                                                        "y": 2466
                                                                                    },
                                                                                    {
                                                                                        "x": 411,
                                                                                        "y": 2513
                                                                                    },
                                                                                    {
                                                                                        "x": 312,
                                                                                        "y": 2512
                                                                                    },
                                                                                    {
                                                                                        "x": 312,
                                                                                        "y": 2465
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "١"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "EOL_SURE_SPACE"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 410,
                                                                                        "y": 2538
                                                                                    },
                                                                                    {
                                                                                        "x": 410,
                                                                                        "y": 2579
                                                                                    },
                                                                                    {
                                                                                        "x": 311,
                                                                                        "y": 2578
                                                                                    },
                                                                                    {
                                                                                        "x": 311,
                                                                                        "y": 2537
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "٤"
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 414,
                                                                                "y": 2208
                                                                            },
                                                                            {
                                                                                "x": 413,
                                                                                "y": 2340
                                                                            },
                                                                            {
                                                                                "x": 314,
                                                                                "y": 2339
                                                                            },
                                                                            {
                                                                                "x": 315,
                                                                                "y": 2207
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 414,
                                                                                        "y": 2208
                                                                                    },
                                                                                    {
                                                                                        "x": 413,
                                                                                        "y": 2272
                                                                                    },
                                                                                    {
                                                                                        "x": 314,
                                                                                        "y": 2271
                                                                                    },
                                                                                    {
                                                                                        "x": 315,
                                                                                        "y": 2207
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "١"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "LINE_BREAK"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 413,
                                                                                        "y": 2298
                                                                                    },
                                                                                    {
                                                                                        "x": 413,
                                                                                        "y": 2340
                                                                                    },
                                                                                    {
                                                                                        "x": 314,
                                                                                        "y": 2339
                                                                                    },
                                                                                    {
                                                                                        "x": 314,
                                                                                        "y": 2297
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "٦"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "blockType": "TEXT"
                                                },
                                                {
                                                    "boundingBox": {
                                                        "vertices": [
                                                            {
                                                                "x": 493,
                                                                "y": 716
                                                            },
                                                            {
                                                                "x": 493,
                                                                "y": 1331
                                                            },
                                                            {
                                                                "x": 167,
                                                                "y": 1331
                                                            },
                                                            {
                                                                "x": 167,
                                                                "y": 716
                                                            }
                                                        ]
                                                    },
                                                    "paragraphs": [
                                                        {
                                                            "boundingBox": {
                                                                "vertices": [
                                                                    {
                                                                        "x": 489,
                                                                        "y": 724
                                                                    },
                                                                    {
                                                                        "x": 493,
                                                                        "y": 1330
                                                                    },
                                                                    {
                                                                        "x": 364,
                                                                        "y": 1331
                                                                    },
                                                                    {
                                                                        "x": 360,
                                                                        "y": 725
                                                                    }
                                                                ]
                                                            },
                                                            "words": [
                                                                {
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 489,
                                                                                "y": 724
                                                                            },
                                                                            {
                                                                                "x": 493,
                                                                                "y": 1330
                                                                            },
                                                                            {
                                                                                "x": 364,
                                                                                "y": 1331
                                                                            },
                                                                            {
                                                                                "x": 360,
                                                                                "y": 725
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 489,
                                                                                        "y": 724
                                                                                    },
                                                                                    {
                                                                                        "x": 489,
                                                                                        "y": 773
                                                                                    },
                                                                                    {
                                                                                        "x": 361,
                                                                                        "y": 774
                                                                                    },
                                                                                    {
                                                                                        "x": 361,
                                                                                        "y": 725
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۲"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 489,
                                                                                        "y": 794
                                                                                    },
                                                                                    {
                                                                                        "x": 489,
                                                                                        "y": 842
                                                                                    },
                                                                                    {
                                                                                        "x": 361,
                                                                                        "y": 843
                                                                                    },
                                                                                    {
                                                                                        "x": 361,
                                                                                        "y": 795
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۰"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 489,
                                                                                        "y": 856
                                                                                    },
                                                                                    {
                                                                                        "x": 489,
                                                                                        "y": 907
                                                                                    },
                                                                                    {
                                                                                        "x": 361,
                                                                                        "y": 908
                                                                                    },
                                                                                    {
                                                                                        "x": 361,
                                                                                        "y": 857
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۰"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 490,
                                                                                        "y": 937
                                                                                    },
                                                                                    {
                                                                                        "x": 490,
                                                                                        "y": 983
                                                                                    },
                                                                                    {
                                                                                        "x": 362,
                                                                                        "y": 984
                                                                                    },
                                                                                    {
                                                                                        "x": 362,
                                                                                        "y": 938
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۰"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 490,
                                                                                        "y": 994
                                                                                    },
                                                                                    {
                                                                                        "x": 490,
                                                                                        "y": 1030
                                                                                    },
                                                                                    {
                                                                                        "x": 362,
                                                                                        "y": 1031
                                                                                    },
                                                                                    {
                                                                                        "x": 362,
                                                                                        "y": 995
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "/"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 490,
                                                                                        "y": 1042
                                                                                    },
                                                                                    {
                                                                                        "x": 490,
                                                                                        "y": 1086
                                                                                    },
                                                                                    {
                                                                                        "x": 362,
                                                                                        "y": 1087
                                                                                    },
                                                                                    {
                                                                                        "x": 362,
                                                                                        "y": 1043
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۰"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 491,
                                                                                        "y": 1108
                                                                                    },
                                                                                    {
                                                                                        "x": 491,
                                                                                        "y": 1150
                                                                                    },
                                                                                    {
                                                                                        "x": 363,
                                                                                        "y": 1151
                                                                                    },
                                                                                    {
                                                                                        "x": 363,
                                                                                        "y": 1109
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۱"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 491,
                                                                                        "y": 1160
                                                                                    },
                                                                                    {
                                                                                        "x": 491,
                                                                                        "y": 1202
                                                                                    },
                                                                                    {
                                                                                        "x": 363,
                                                                                        "y": 1203
                                                                                    },
                                                                                    {
                                                                                        "x": 363,
                                                                                        "y": 1161
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "/"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 491,
                                                                                        "y": 1221
                                                                                    },
                                                                                    {
                                                                                        "x": 491,
                                                                                        "y": 1268
                                                                                    },
                                                                                    {
                                                                                        "x": 363,
                                                                                        "y": 1269
                                                                                    },
                                                                                    {
                                                                                        "x": 363,
                                                                                        "y": 1222
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۲"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "LINE_BREAK"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 492,
                                                                                        "y": 1290
                                                                                    },
                                                                                    {
                                                                                        "x": 492,
                                                                                        "y": 1330
                                                                                    },
                                                                                    {
                                                                                        "x": 364,
                                                                                        "y": 1331
                                                                                    },
                                                                                    {
                                                                                        "x": 364,
                                                                                        "y": 1291
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "۲"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "boundingBox": {
                                                                "vertices": [
                                                                    {
                                                                        "x": 244,
                                                                        "y": 716
                                                                    },
                                                                    {
                                                                        "x": 240,
                                                                        "y": 1259
                                                                    },
                                                                    {
                                                                        "x": 167,
                                                                        "y": 1258
                                                                    },
                                                                    {
                                                                        "x": 171,
                                                                        "y": 715
                                                                    }
                                                                ]
                                                            },
                                                            "words": [
                                                                {
                                                                    "property": {
                                                                        "detectedLanguages": [
                                                                            {
                                                                                "languageCode": "en",
                                                                                "confidence": 1
                                                                            }
                                                                        ]
                                                                    },
                                                                    "boundingBox": {
                                                                        "vertices": [
                                                                            {
                                                                                "x": 244,
                                                                                "y": 716
                                                                            },
                                                                            {
                                                                                "x": 240,
                                                                                "y": 1259
                                                                            },
                                                                            {
                                                                                "x": 167,
                                                                                "y": 1258
                                                                            },
                                                                            {
                                                                                "x": 171,
                                                                                "y": 715
                                                                            }
                                                                        ]
                                                                    },
                                                                    "symbols": [
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 243,
                                                                                        "y": 716
                                                                                    },
                                                                                    {
                                                                                        "x": 243,
                                                                                        "y": 763
                                                                                    },
                                                                                    {
                                                                                        "x": 171,
                                                                                        "y": 762
                                                                                    },
                                                                                    {
                                                                                        "x": 171,
                                                                                        "y": 715
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "G"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 243,
                                                                                        "y": 780
                                                                                    },
                                                                                    {
                                                                                        "x": 243,
                                                                                        "y": 823
                                                                                    },
                                                                                    {
                                                                                        "x": 171,
                                                                                        "y": 822
                                                                                    },
                                                                                    {
                                                                                        "x": 171,
                                                                                        "y": 779
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "T"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 243,
                                                                                        "y": 840
                                                                                    },
                                                                                    {
                                                                                        "x": 243,
                                                                                        "y": 887
                                                                                    },
                                                                                    {
                                                                                        "x": 171,
                                                                                        "y": 886
                                                                                    },
                                                                                    {
                                                                                        "x": 171,
                                                                                        "y": 839
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "8"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 242,
                                                                                        "y": 903
                                                                                    },
                                                                                    {
                                                                                        "x": 242,
                                                                                        "y": 946
                                                                                    },
                                                                                    {
                                                                                        "x": 170,
                                                                                        "y": 945
                                                                                    },
                                                                                    {
                                                                                        "x": 170,
                                                                                        "y": 902
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "5"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 242,
                                                                                        "y": 964
                                                                                    },
                                                                                    {
                                                                                        "x": 242,
                                                                                        "y": 1011
                                                                                    },
                                                                                    {
                                                                                        "x": 170,
                                                                                        "y": 1010
                                                                                    },
                                                                                    {
                                                                                        "x": 170,
                                                                                        "y": 963
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "4"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 241,
                                                                                        "y": 1023
                                                                                    },
                                                                                    {
                                                                                        "x": 241,
                                                                                        "y": 1070
                                                                                    },
                                                                                    {
                                                                                        "x": 169,
                                                                                        "y": 1069
                                                                                    },
                                                                                    {
                                                                                        "x": 169,
                                                                                        "y": 1022
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "4"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 241,
                                                                                        "y": 1092
                                                                                    },
                                                                                    {
                                                                                        "x": 241,
                                                                                        "y": 1123
                                                                                    },
                                                                                    {
                                                                                        "x": 169,
                                                                                        "y": 1122
                                                                                    },
                                                                                    {
                                                                                        "x": 169,
                                                                                        "y": 1091
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "1"
                                                                        },
                                                                        {
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 240,
                                                                                        "y": 1147
                                                                                    },
                                                                                    {
                                                                                        "x": 240,
                                                                                        "y": 1198
                                                                                    },
                                                                                    {
                                                                                        "x": 168,
                                                                                        "y": 1197
                                                                                    },
                                                                                    {
                                                                                        "x": 168,
                                                                                        "y": 1146
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "8"
                                                                        },
                                                                        {
                                                                            "property": {
                                                                                "detectedBreak": {
                                                                                    "type": "LINE_BREAK"
                                                                                }
                                                                            },
                                                                            "boundingBox": {
                                                                                "vertices": [
                                                                                    {
                                                                                        "x": 240,
                                                                                        "y": 1212
                                                                                    },
                                                                                    {
                                                                                        "x": 240,
                                                                                        "y": 1259
                                                                                    },
                                                                                    {
                                                                                        "x": 168,
                                                                                        "y": 1258
                                                                                    },
                                                                                    {
                                                                                        "x": 168,
                                                                                        "y": 1211
                                                                                    }
                                                                                ]
                                                                            },
                                                                            "text": "9"
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "blockType": "TEXT"
                                                }
                                            ]
                                        }
                                    ],
                                    "text": "اه\nهورية مصر العربية\nبطاقة تحقيق الشخصية\nمحمود\nمصباح عبدالحلیم نمیر\nالجمهورية\nالمحله ثان - الغربية\n۲۰۰۰۱ ۲۲ ٩٢\n٠١٤\n١٦\n۲۰۰۰/۰۱/۲۲\nGT8544189"
                                }
                            }
                        ]
                    }
                }
            },
            "original_filename": "1684772280345-id2",
            "api_key": "456227395388136"
        }
    callback(null, dummy_result)
}


module.exports = {uploadImage, uploadIDs, uploadIDsDummy}