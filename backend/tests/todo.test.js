const request = require('supertest')
const app = require('../app')
const Task = require('../model/task')
const mongoose = require('mongoose')
const testDB = process.env.MONGOURI_TEST

beforeAll(async () => {
  await mongoose.connect(testDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Server status test', () => {
  it('should return simple 200', async () => {
    const res = await request(app)
      .get('/api')
      .expect(200);
    expect(res.body).toEqual({ data: 'Api Router called' });
  });

  it('should return 404', async () => {
    const res = await request(app)
      .get('/api/abc')
      .expect(404);
    expect(res.body).toEqual({ Error: 'Cant Find /api/abc' });
  });
});

describe('Get /getTasks', () => {
  // jest.setTimeout(300000);
  it('should return all tasks with status 200', async () => {
    const task = new Task({ title: 'Task 1' });
    await task.save();

    const res = await request(app)
      .get('/api/getTasks')
      .expect(200);

    expect(res.body.some((taskObj) => taskObj._id === task._id.toString())).toBe(true);

    await Task.deleteMany();
  });

  it('should return an error with status 404 if no tasks are found', async () => {
    const res = await request(app)
      .get('/api/getTasks')
      .expect(404);

    expect(res.body).toEqual({ error: 'Tasks not found' });
  });
});

describe('POST /api/createTask', () => {
  afterEach(async () => {
    await Task.deleteMany();
  });

  it('should create a new task and return status 200', async () => {
    const taskData = { title: 'Task 1' };

    const res = await request(app)
      .post('/api/createTask')
      .send(taskData)
      .expect(200);

    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Task 1');

    const createdTask = await Task.findById(res.body._id);
    expect(createdTask).toBeDefined();
    expect(createdTask.title).toBe('Task 1');
  });

  it('should return status 500 and error message if task creation fails', async () => {
    const taskData = {};

    const res = await request(app)
      .post('/api/createTask')
      .send(taskData)
      .expect(500);

    expect(res.body).toEqual({ error: 'Failed to create task' });
  });
});

describe('DELETE /api/delTask/:id', () => {
  afterEach(async () => {
    await Task.deleteMany();
  });

  it('should delete the specified task and return status 200', async () => {
    const task = await Task.create({ title: 'Task 1' });

    const res = await request(app)
      .delete(`/api/delTask/${task._id}`)
      .expect(200);

    expect(res.body).toEqual({ message: 'Task deleted' });

    const deletedTask = await Task.findById(task._id);
    expect(deletedTask).toBeNull();
  });

  it('should return status 500', async () => {
    const invalidTaskId = 'invalid_id';

    const res = await request(app)
      .delete(`/api/delTask/${invalidTaskId}`)
      .expect(500);

    expect(res.body).toEqual({ error: 'Failed to delete task' });
  });
});

describe('PATCH /api/checkTask/:id', () => {
  afterEach(async () => {
    await Task.deleteMany();
  });

  it('should update the specified task status', async () => {
    const task = await Task.create({ title: 'Task 1', status: 'active' });

    const res = await request(app)
      .patch(`/api/checkTask/${task._id}`)
      .expect(200);

    expect(res.body.title).toBe('Task 1');
    expect(res.body.status).toBe('checked');
    expect(res.body.checkedAt).toBeDefined();

    const updatedTask = await Task.findById(task._id);
    expect(updatedTask.status).toBe('checked');
    expect(updatedTask.checkedAt).toBeDefined();
  });
});

describe('PATCH /api/checkTask/:id', () => {
  afterEach(async () => {
    await Task.deleteMany();
  });

  it('should update the specified task status', async () => {
    const task = await Task.create({ title: 'Task 1', status: 'checked' });

    const res = await request(app)
      .patch(`/api/uncheckTask/${task._id}`)
      .expect(200);

    expect(res.body.title).toBe('Task 1');
    expect(res.body.status).toBe('active');
    expect(res.body.checkedAt).toBeDefined();

    const updatedTask = await Task.findById(task._id);
    expect(updatedTask.status).toBe('active');
    expect(updatedTask.checkedAt).toBeDefined();
  });
});