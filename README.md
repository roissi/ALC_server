# ALC_server
Artificial life coach (back-end)

Visit [https://artificial-life-coach.vercel.app](https://artificial-life-coach.vercel.app)

Artificial Life Coach is an application that aims to offer its users an artificial life coach to manage their weekly interactive agenda on a daily basis, both according to their interests and their current needs.

### Contents

- [ALC\_server](#alc_server)
    - [Contents](#contents)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Use](#use)
    - [Contribution](#contribution)
    - [Licence](#licence)
  - [Support this project](#support-this-project)

### Prerequisites

- Node.js (v18 et +)
- Express
- PostgreSQL
- Your OPENAI_API_KEY

### Installation

1. **Clone this repository** :
   ```bash
   git clone https://github.com/votre_nom_utilisateur/ALC_server.git
2. **Go to the project folder** :
   ```bash
   cd ALC_server
3. **Install dependencies** :
   ```bash
   npm install
4. **Start PostgreSQL service** :
   ```bash
   sudo service postgresql start
5. **Start the server** :
   ```bash
   npm start

### Use

You must create PostgreSQL database, and launch the script `data/ALCAI.sql`.

Then, create your `.env` file by filling in these fields :

`OPENAI_API_KEY=`  
`PORT=`  
`DB_NAME=`  
`DB_USER=`  
`JWT_SECRET=`

### Contribution

If you would like to contribute to this project, please follow these steps:

1. **Fork this repository**.
2. **Create a new branch**.
3. **Commit your changes**.
4. **Push your changes**.
5. **Submit a Pull Request**.

### Licence

This project is licensed under the MIT License, which means you can use, modify, and redistribute it provided you follow the terms of that license. If you are making public and/or commercial use of this project, a simple mention ("**roissi / 2023**") with a link to this GitHub repository would be appreciated.

For more information about the MIT License, please see [Open Source Initiative](https://opensource.org/license/mit).

For any other questions or clarifications, do not hesitate to open a ticket or [contact me](mailto:cyrildegraeve@gmail.com).

---------------------------------------
Cf. [Artificial life coach (front-end)](https://github.com/roissi/ALC_client)

---------------------------------------
## Support this project

If you find this project useful or interesting, please give it a star ⭐! This would greatly help to raise awareness within the community. Thank you for your support !