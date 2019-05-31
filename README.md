# K-LASS
KMITL Large Area Sensing System

![K-LASS](https://klass.greenkmitl.com/assets/img/klass-logo.jpg)

In the present day in Thailand, there has been a large surge in public interest over air quality monitoring due to a record year in air pollution and several incidences of large amounts of dust particles and smog covering large metropolitan areas across the country. Combined with a lack of trust in official data sources and the demand for independently provided information, our team figured that a system that could wirelessly and automatically collect and log air quality information over an area and then present it in useful and easy to understand format would be greatly beneficial to the public. Therefore, our team decided to create the K-LASS platform.

To achieve this, our team developed a LoRA node-based infrastructure of several devices which collects humidity, temperature and PM 2.5 data and sends it to a central gateway node using LoRA. A central server is used to collect and maintain the data sent from the gateway. Then a web-based frontend is used to present the data in a graphical representation to the public.

To test the viability of the system, two sensor nodes and one gateway were constructed and one server was setup using Azure cloud services. The two nodes were first tested outdoors for a week and then tested at KMITL in real conditions. The nodes proved to be able to function despite extreme heat and heavy rain, but it was found that the heavy rain did affect the accuracy of the PM2.5 sensor readings

## Website
Visit our website https://klass.greenkmitl.com/

![K-LASS Ads](https://i.imgur.com/Xt1eozK.png)
