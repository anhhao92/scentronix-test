import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import { findServer } from 'src/server';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

describe('findServer tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should return the lowest priority server', async () => {
    fetchMock.mockResponse(() =>
      Promise.resolve({
        status: 200,
        body: 'ok',
      })
    );
    const response = await findServer();
    expect(response).toEqual({
      priority: 1,
      url: 'https://does-not-work.perfume.new',
    });
  });

  it('should throw error when there is no online server', async () => {
    fetchMock.mockResponse(() =>
      Promise.resolve({
        status: 404,
        body: 'Not Found',
      })
    );
    await expect(() => findServer()).rejects.toThrowError();
  });

  it('should throw error when reaching timeout', async () => {
    fetchMock.mockResponse(() =>
      Promise.resolve({
        status: 200,
        body: 'ok',
      })
    );
    const response = findServer();
    vi.runAllTimers();
    await expect(() => response).rejects.toThrowError('No online server');
  });
});
