const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require ('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const resolvers = require('./resolver');
const typeDefs = require('./schema');
const server = new ApolloServer({typeDefs,resolvers});

// Load the protobuf definitions for the microservices
const gymMembershipProto = grpc.loadPackageDefinition(
  protoLoader.loadSync('gym.proto', {
    keepCase: true,
    defaults: true,
  })
).gym;

const app = express();
server.start().then(()=>{
  app.use(cors(),bodyParser.json(),expressMiddleware(server));
});




const gymCustomerProto = grpc.loadPackageDefinition(
  protoLoader.loadSync('customer.proto', {
    keepCase: true,
    defaults: true,
  })
).customer;


// Create gRPC client instances for the microservices
const gymMembershipClient = new gymMembershipProto.GymMembershipService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

const gymCustomerClient = new gymCustomerProto.GymCustomerService(
  'localhost:50052',
  grpc.credentials.createInsecure()
);

// Define API routes for the API Gateway
app.post('/memberships', (req, res) => {
  const membership = req.body.membership;

  gymMembershipClient.CreateMembership({ membership }, (err, response) => {
    if (err) {
      console.error('Error creating membership:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(response.membership);
  });
});

app.get('/memberships/:memberId', (req, res) => {
  const memberId = req.params.memberId;

  gymMembershipClient.GetMembership({ member_id: memberId }, (err, response) => {
    if (err) {
      console.error('Error retrieving membership:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(response.membership);
  });
});

app.post('/customers', (req, res) => {
  const customer = req.body.customer;

  gymCustomerClient.CreateCustomer({ customer }, (err, response) => {
    if (err) {
      console.error('Error creating customer:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(response.customer);
  });
});

app.get('/customers/:customerId', (req, res) => {
  const customerId = req.params.customerId;

  gymCustomerClient.GetCustomer({ customer_id: customerId }, (err, response) => {
    if (err) {
      console.error('Error retrieving customer:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(response.customer);
  });


});
const PORT=5000;
// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
