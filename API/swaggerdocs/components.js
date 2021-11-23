module.exports = {
    components: {
      schemas: {
        // id model
        users: {
          type: "object", // data type
          description: "User Model", // desc
          properties:{
              name:{
                type:"string",
                description:"Name of user",
                example:"Abhipraya"
              },
              email:{
                type:"string",
                description:"Email Id of User",
                example:"dashabhipraya@gmail.com"
              },
              password:{
                type:"string",
                description:"Password",
                example:"Abhipraya@12"
              }
          }
        },
        transactions:{
              type:"Object",
              description:"Transaction Model",
              properties:{
                  Duration:{
                      type:"Object",
                      description:"Time of transaction",
                  },
                  Type:{
                      type:"string",
                      description:"type of transaction"
                  },
                  airport:{
                      type:"Object",
                      description:"Airport"
                  },
                  aircraft:{
                      type:"Object",
                      description:"Aircraft"
                  },
                  quantity:{
                      type:"Number",
                      description:"Quantity of transaction"
                  }
              }
        },
        airports:{
            type:"Object",
            description:"Airport Model",
            properties:{
                name:{
                    type:"string",
                    description:"name of Airport"
                },
                fuelcapacity:{
                    type:"Number",
                    description:"Fuel capacity of Airport"
                },
                fuelavailable:{
                    type:"Number",
                    description:"Fuel available in Airport"
                }
            }
        },
        aircrafts:{
            type:"Object",
            description:"Aircraft Model",
            properties:{
                aircraft_no:{
                    type:"Number",
                    description:"Aircraft Number"
                },
                airline:{
                    type:"string",
                    description:"Airline name"
                }
            }
        },
        aircraftlists:{
            type:"Object",
            description:"AircraftList Model",
            properties:{
                aircraftlist:{
                    type:"Array",
                    description:"List of Aircrafts Available"
                }
            }
        },
        airportlists:{
            type:"Object",
            description:"AirportList Model",
            properties:{
                airportList:{
                    type:"Array",
                    description:"List of Airports Available"
                }
            }
        }
    }
    }
}