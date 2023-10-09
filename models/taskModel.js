'use strict';

/** *********** Modules ***********/
const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;
 
/**************************************************
 ************* Task Model or Collection ***********
 **************************************************/

const taskSchema = new Schema({
    taskName: { type: String },
    moduleName: { type: String },
    projectId: { type: Schema.Types.ObjectId, ref: 'project', index: true },
    milestoneId: { type: Schema.Types.ObjectId, ref: 'milestone', index: true },
    taskStatus: { type: Number, enum: Object.values([1,2,3,4]), default: 1},
	taskIndex: { type: Number },
    resources: [ {
        _id: false,
        teamId: { type: Schema.Types.ObjectId, ref: 'teams', index: true },
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        userName: { type: String },
        quotedHours: { type: String },
        quotedTimeInSeconds: { type: Number, default: 0 },
        actualTimeInSeconds: { type: Number, default: 0 },
        overAllActualTimeInSeconds: { type: Number, default: 0 }
    } ],
	teamIds: [ { type: Schema.Types.ObjectId, ref: 'teams', index: true } ],
    isDefault: { type: Boolean },
    quotedHours: { type: String },
    quotedTimeInSeconds: { type: Number, default: 0 },
    actualTimeInSeconds: { type: Number, default: 0 },
    overAllActualTimeInSeconds: { type: Number, default: 0 },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'users', index: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'users', index: true },
    isDeleted: { type: Boolean },
    statusReasonChange: { type: String }
}, { timestamps: true, versionKey: false, collection: 'tasks' });

module.exports = MONGOOSE.model('tasks', taskSchema);