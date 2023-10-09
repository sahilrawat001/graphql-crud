const { gql } = require('apollo-server-express');
const taskModel = require("./models/taskModel");

const { default: mongoose } = require('mongoose');

exports.typeDefs = gql `
type Task {
    id: ID
    taskName: String,
    moduleName: String,
    projectId: ID,
    milestoneId: ID,
    taskStatus: Int,
    taskIndex: Int,
    resources: [TaskResource],
    teamIds: [ID]!,
    isDefault: Boolean,
    quotedHours: String,
    quotedTimeInSeconds: Int,
    actualTimeInSeconds: Int,
    overAllActualTimeInSeconds: Int,
    description: String,
    createdBy: ID,
    updatedBy: ID,
    isDeleted: Boolean,
    statusReasonChange: String,
    createdAt: String,
    updatedAt: String,
  }
  type TaskResource {
    teamId: ID,
    userId: ID,
    userName: String,
    quotedHours: String!,
    quotedTimeInSeconds: Int!,
    actualTimeInSeconds: Int!,
    overAllActualTimeInSeconds: Int!,
  }
  
type Query {
    getTaskList: [Task]
    getTask(id: ID!): Task
    getTaskByName(taskName: String!): [Task]

}
type Mutation {
    updateTask(
        id: ID
        taskName: String,
        moduleName: String,
        projectId: ID,
        milestoneId: ID,
        taskStatus: Int,
        taskIndex: Int,
        teamIds: [ID],
        isDefault: Boolean,
        quotedHours: String,
        quotedTimeInSeconds: Int,
        actualTimeInSeconds: Int,
        overAllActualTimeInSeconds: Int,
        description: String,
        createdBy: ID,
        updatedBy: ID,
        isDeleted: Boolean,
        statusReasonChange: String,
        createdAt: String,
        updatedAt: String,
        ): Task
    addTask(
        id: ID
        taskName: String,
        moduleName: String,
        projectId: ID,
        milestoneId: ID,
        taskStatus: Int,
        taskIndex: Int,
        teamIds: [ID],
        isDefault: Boolean,
        quotedHours: String,
        quotedTimeInSeconds: Int,
        actualTimeInSeconds: Int,
        overAllActualTimeInSeconds: Int,
        description: String,
        createdBy: ID,
        updatedBy: ID,
        isDeleted: Boolean,
        statusReasonChange: String,
        createdAt: String,
        updatedAt: String,
      ): Task
    deleteProduct(id: ID!): Boolean!
} `


const db_url = 'mongodb://localhost:27017/project-management-db';


const connect = async () => {
    await mongoose.connect(db_url, { useNewUrlParser: true });
}


exports.resolvers = {
    Query: {

        getTaskList: async (parent, args) => {
            await connect();
            const result = taskModel.find({}).then((res) => {
                if (res) {
                    return res;
                }
            })
            return result;

        },
        getTask: async (parent, args) => {
            await connect();
            const result = taskModel.findById(args.id).then((res) => {
                if (res) {
                    return res;
                }
            })
            return result;

        },
        getTaskByName: async (parent, args) => {
            await connect();
            const result =await taskModel.find({ taskName: args.taskName }).then((res) => {
                if (res) {
                    return res;
                }
            })
            // console.log(result);
            return result;

        }
    },

    Mutation: {
        updateTask: async (parent, args) => {
            await connect();
            const result = taskModel.findByIdAndUpdate(args.id, 
                {
                   ...args
                }, {new: true}).then((res) => {
                    if (res) {
                        return res;
                    }
                })
            return result;
        },
        addTask :  async (parent, args) => {
            await connect();
            let product = new taskModel({
               ...args
            });
           const result = product.save().then((res) => {
                return res;
            })
            return result;
        },
        deleteProduct:  async (parent, args) => {
            try {
                await connect();
                await taskModel.findOneAndRemove({_id: args.id});
                return true;
            } catch (error) {
                console.log('Error while delete:',error);
                return false;
            }
            
        }
    }
}