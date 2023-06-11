To install dependensies, use command: npm i   
To start site locally, use command: npm run dev   
To build site in production, use command: npm run build (because site use react-router, may exist some bugs, so you can check my deploy on Netlify)   
Before starting you should check your instance setting if it can receive notifications https://green-api.com/docs/api/receiving/technology-http-api/   


My tecnology stack: react, typescript, react-router, scss, webpack. Also use eslint/prettier   
To bypassing cors error i use my own deploy of cors-anywhere server on railway   
How my site works: In login page you have to input your green-api idInstanse and apiTokenInstance. If id or token was incorrect, site process this error correctly. 
After authorization you can add contact in input field. If contact isn't exist, site will not add phone number to contact list. If exist, will add. You can create multiple chats and 
switch between them. Every chat has his own chat history. You can select chat clicking on interesting phone number in the list on the left. Sent messages are on the right with green background,
received messages are on the left with white background.

Screens:   
![image](https://github.com/foxnorth228/green-api-chat/assets/102675886/9070e548-67cb-4650-b023-79ff22d5b5ee)
![image](https://github.com/foxnorth228/green-api-chat/assets/102675886/01405c57-48d7-41ea-8a16-8e10db1cd60d)
![image](https://github.com/foxnorth228/green-api-chat/assets/102675886/64d33842-29ee-4273-badb-de5b8ad5a19f)
![image](https://github.com/foxnorth228/green-api-chat/assets/102675886/988cd450-8eb7-4259-bb4e-eec2dc85f21b)
![image](https://github.com/foxnorth228/green-api-chat/assets/102675886/9c77db44-2eee-4abf-a211-eb0a0b8a138a)
![image](https://github.com/foxnorth228/green-api-chat/assets/102675886/9b27478e-db84-449d-abed-2a878f439f57)
![image](https://github.com/foxnorth228/green-api-chat/assets/102675886/7063ee3c-b72c-4dd8-a066-3537bd848ca2)
![image](https://github.com/foxnorth228/green-api-chat/assets/102675886/5d143e33-af5d-4f03-9238-db3b0d7b9564)
