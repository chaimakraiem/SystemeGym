// Import necessary libraries and modules
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync('customer.proto', {
  keepCase: true,
  defaults: true,
});

// Load the gym.proto package
const gymPackage = grpc.loadPackageDefinition(packageDefinition).customer;

// Implement the GymCustomerService
const GymCustomerService = {
  CreateCustomer: (call, callback) => {
    const customer = call.request.customer;
    // Logic to create a new customer
    // ...
    const response = { customer };
    callback(null, response);
  },
  GetCustomer: (call, callback) => {
    const customer_id = call.request.customer_id;
    // Logic to retrieve customer details by customer_id
    // ...
    const customer = { /* Customer details */ };
    const response = { customer };
    callback(null, response);
  },
  UpdateCustomer: (call, callback) => {
    const customer = call.request.customer;
    // Logic to update an existing customer
    // ...
    const response = { customer };
    callback(null, response);
  },
  DeleteCustomer: (call, callback) => {
    const customer_id = call.request.customer_id;
    // Logic to delete a customer by customer_id
    // ...
    const response = { message: 'Customer deleted successfully' };
    callback(null, response);
  },
};

// Create a gRPC server
const server = new grpc.Server();

// Add the GymCustomerService to the server
server.addService(gymPackage.GymCustomerService.service, GymCustomerService);

// Start the server and listen on a specific port
const port=50052;
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

console.log('GymCustomer microservice is running...');
