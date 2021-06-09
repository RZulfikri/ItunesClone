import API from '../../src/Services/Api';

const api = API.create();
const API_TIMEOUT_DURATION = 1000; // in ms

describe('Test Api services', () => {
  // test to check api response when keyword empty
  test('Api searchArtist empty term/keyword', async () => {
    const response = await api.searchArtist('');
    expect(response.ok).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.duration).toBeLessThanOrEqual(API_TIMEOUT_DURATION);
    expect(response.data).toBeDefined();
    expect(response.data).not.toBeNull();
    expect(response.data).toHaveProperty('resultCount', 0);
    expect(response.data).toHaveProperty('results', []);
  });

  // test to check api response when keyword exsist ("justin")
  test('Api searchArtist with term/keyword', async () => {
    const response = await api.searchArtist('justin');
    expect(response.ok).toEqual(true);
    expect(response.status).toEqual(200);
    expect(response.duration).toBeLessThanOrEqual(API_TIMEOUT_DURATION);
    expect(response.data).toBeDefined();
    expect(response.data).not.toBeNull();
    expect(response.data).toHaveProperty('resultCount', 50);
    expect(response.data).toHaveProperty(
      'results',
      expect.arrayContaining([
        expect.objectContaining({
          trackId: expect.any(Number),
          artworkUrl60: expect.any(String),
          artworkUrl100: expect.any(String),
          trackName: expect.any(String),
          artistName: expect.any(String),
          collectionName: expect.any(String),
          previewUrl: expect.any(String),
        }),
      ]),
    );
  });
});
