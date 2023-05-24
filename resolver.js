// Données d'exemple pour les clients et les adhésions
const customers = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];
  
  const memberships = [
    { id: '1', customerId: '1', startDate: '2023-01-01', endDate: '2023-12-31', isActive: true },
    { id: '2', customerId: '2', startDate: '2023-02-01', endDate: '2023-03-31', isActive: false },
    { id: '3', customerId: '1', startDate: '2023-03-01', endDate: '2023-04-30', isActive: true },
  ];
  
  // Définir les résolveurs
  const resolvers = {
    Query: {
      getCustomer: (parent, args, context, info) => {
        const { id } = args;
        return customers.find((customer) => customer.id === id);
      },
    },
    GymCustomer: {
      memberships: (parent, args, context, info) => {
        const { id } = parent;
        return memberships.filter((membership) => membership.customerId === id);
      },
    },
    Mutation: {
      createMembership: (parent, args, context, info) => {
        const { customerId, startDate, endDate } = args;
        const id = memberships.length + 1;
        const isActive = true; // Par défaut, une nouvelle adhésion est active
        const membership = { id: id.toString(), customerId, startDate, endDate, isActive };
        memberships.push(membership);
        return membership;
      },
    }
};

module.exports = resolvers;