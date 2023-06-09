const request = require('supertest');
const app = require('../app');
const Task = require('../model/task');
const mongoose = require('mongoose');
const testDB = process.env.MONGOURI_TEST;
const BASE_URL = '/api/v1';

// Define test dataset
const taskDataset = {
  title: 'Task 1',
};

// Define expected values
const expectedValues = {
  createdTaskTitle: 'Task 1',
  errorTaskCreation: 'Failed to create task',
  errorTaskDeletion: 'Failed to delete task',
  tasksNotFound: 'Tasks not found',
  taskDeletedMessage: 'Task deleted',
  activeStatus: 'active',
  checkedStatus: 'checked',
};

beforeAll(async () => {
  await mongoose.connect(testDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Test server status
describe('Server status test', () => {
  it('should return simple 200', async () => {
    const res = await request(app)
      .get(BASE_URL)
      .expect(200);

    expect(res.body).toEqual({ data: 'Api Router called' });
  });

  it('should return 404', async () => {
    const res = await request(app)
      .get(BASE_URL+'/abc')
      .expect(404);

    expect(res.body).toEqual({ Error: `Cant Find ${BASE_URL}/abc` });
  });
});

// Test GET /tasks endpoint
describe('GET /tasks', () => {
  afterEach(async () => {
    await Task.deleteMany();
  });

  it('should return all tasks with status 200', async () => {
    const task = new Task(taskDataset);
    await task.save();

    const res = await request(app)
      .get(BASE_URL+'/tasks')
      .expect(200);

    expect(res.body.some((taskObj) => taskObj._id === task._id.toString())).toBe(true);

    await Task.deleteMany();
  });

  it('should return an error with status 404 if no tasks are found', async () => {
    const res = await request(app)
      .get(BASE_URL+'/tasks')
      .expect(404);

    expect(res.body).toEqual({ error: expectedValues.tasksNotFound });
  });
});

// Test POST /tasks endpoint
describe('POST /tasks', () => {
  afterEach(async () => {
    await Task.deleteMany();
  });

  it('should create a new task and return status 200', async () => {
    const res = await request(app)
      .post(BASE_URL+'/tasks')
      .send(taskDataset)
      .expect(200);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(expectedValues.createdTaskTitle);

    const createdTask = await Task.findById(res.body._id);
    expect(createdTask).toBeDefined();
    expect(createdTask.title).toBe(expectedValues.createdTaskTitle);
  });

  it('should return status 500 and error message if task creation fails', async () => {
    const res = await request(app)
      .post(BASE_URL+'/tasks')
      .send({})
      .expect(500);

    expect(res.body).toEqual({ error: expectedValues.errorTaskCreation });
  });
});

// Test DELETE /tasks/:id endpoint
describe(`DELETE ${BASE_URL}/tasks/:id`, () => {
  afterEach(async () => {
    await Task.deleteMany();
  });

  it('should delete the specified task and return status 200', async () => {
    const task = await Task.create(taskDataset);

    const res = await request(app)
      .delete(BASE_URL+`/tasks/${task._id}`)
      .expect(200);

    expect(res.body).toEqual({ message: expectedValues.taskDeletedMessage });

    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });

  it('should return status 500', async () => {
    const invalidTaskId = 'invalid_id';
    const res = await request(app)
      .delete(BASE_URL+`/tasks/${invalidTaskId}`)
      .expect(500);

    expect(res.body).toEqual({ error: expectedValues.errorTaskDeletion });
  });
});

// Test PATCH /tasks/:id/check endpoint
describe(`PATCH ${BASE_URL}/tasks/:id/check`, () => {
  afterEach(async () => {
    await Task.deleteMany();
  });

  it('should update the specified task status', async () => {
    const task = await Task.create({ ...taskDataset, status: expectedValues.activeStatus });

    const res = await request(app)
      .patch(BASE_URL+`/tasks/${task._id}/check`)
      .expect(200);

    expect(res.body.title).toBe(taskDataset.title);
    expect(res.body.status).toBe(expectedValues.checkedStatus);
    expect(res.body.checkedAt).toBeDefined();

    const updatedTask = await Task.findById(task._id);
    expect(updatedTask.status).toBe(expectedValues.checkedStatus);
    expect(updatedTask.checkedAt).toBeDefined();
  });
});

// Test PATCH /tasks/:id/uncheck endpoint
describe(`PATCH ${BASE_URL}/tasks/:id/uncheck`, () => {
  afterEach(async () => {
    await Task.deleteMany();
  });

  it('should update the specified task status', async () => {
    const task = await Task.create({ ...taskDataset, status: expectedValues.checkedStatus });

    const res = await request(app)
      .patch(BASE_URL+`/tasks/${task._id}/uncheck`)
      .expect(200);

    expect(res.body.title).toBe(taskDataset.title);
    expect(res.body.status).toBe(expectedValues.activeStatus);
    expect(res.body.checkedAt).toBeDefined();

    const updatedTask = await Task.findById(task._id);
    expect(updatedTask.status).toBe(expectedValues.activeStatus);
    expect(updatedTask.checkedAt).toBeDefined();
  });
});
