# DNS-Server

A sample nameserver for resolving DNS queries

Web Link : [http://ec2-3-7-147-20.ap-south-1.compute.amazonaws.com/](http://ec2-3-7-147-20.ap-south-1.compute.amazonaws.com/)

## Features

- **DNS Server** : A DNS server that can resolve DNS queries
- **DNS Resolver** : A DNS resolver that can resolve DNS queries
- **DNS Cache** : A DNS cache that can store the resolved DNS queries

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Docker 20.10.7 or higher
- Docker Compose 1.29.2 or higher
- Git 2.25.1 or higher
- MongoDB Connection URL

### Installation

1. Clone the repository

```bash
git clone https://github.com/kpriyanshu2003/dns-server
```

2. Change the working directory

```bash
cd dns-server
```

3. Configure the client

```bash
cd client
cp .env.example .env
npm install
```

4. Configure the server

```bash
cd server
cp .env.example .env
npm install
```

5. Start the application

Starting the client:

```bash
cd client
npm run dev
```

Starting the server

```bash
cd server
npm start
```

## Technologies Used

- **Frontend** : Next.js, React.js, Tailwind CSS, Next UI, React Icons, Typescript
- **Backend** : Node.js, Typescript, JWT, Mongoose, DNS-Packet, Express.js,
- **Database** : MongoDB

## Contributing

We welcome contributions from the community to enhance DNS-Server. Feel free to submit bug reports, feature requests, or pull requests through the GitHub repository.

## License

This project is licensed under [MIT License](https://opensource.org/licenses/MIT)
