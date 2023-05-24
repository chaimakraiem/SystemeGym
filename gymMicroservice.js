// Import necessary libraries and modules
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync('gym.proto', {
  keepCase: true,
  defaults: true,
});

// Load the gym.proto package
const gymPackage = grpc.loadPackageDefinition(packageDefinition).gym;

// Implement the GymMembershipService
const GymMembershipService = {
  CreateMembership: (call, callback) => {
    const membership = call.request.membership;
    // Logic to create a new membership
    // ...
    const response = { membership };
    callback(null, response);
  },
  GetMembership: (call, callback) => {
    const member_id = call.request.member_id;
    // Logic to retrieve membership details by member_id
    // ...
    const membership = { /* Membership details */ };
    const response = { membership };
    callback(null, response);
  },
  UpdateMembership: (call, callback) => {
    const membership = call.request.membership;
    // Logic to update an existing membership
    // ...
    const response = { membership };
    callback(null, response);
  },
  CancelMembership: (call, callback) => {
    const member_id = call.request.member_id;
    // Logic to cancel a membership by member_id
    // ...
    const response = { message: 'Membership canceled successfully' };
    callback(null, response);
  },
};

// Create a gRPC server
const server = new grpc.Server();

// Add the GymMembershipService to the server
server.addService(gymPackage.GymMembershipService.service, GymMembershipService);

// Start the server and listen on a specific port

const port=50051;
server.bindAsync(`0.0.0.0:${port}`, 
  grpc.ServerCredentials.createInsecure(),
  (err,port)=>{
    if (err){
    console.error('failed',err);
    return;
  }
  console.log(`server is running on port ${port}`);
  server.start();
  }
);

console.log('GymMembership microservice is running...');
