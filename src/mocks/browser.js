import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';
import cities from '../assets/cities50.json';

export const worker = setupWorker(
  // http.get('http://backend.com/houses', () => HttpResponse.json({ houses })),
  http.get('http://backend.com/cities', () => HttpResponse.json({ cities })),
);

export default worker;
