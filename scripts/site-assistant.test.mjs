import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { answerQuestion } from '../src/lib/site-assistant.mjs';

test('commercial intent outranks generic service and keeps unknown pricing honest', () => {
  const answers = answerQuestion('How much does a pergola cost?');
  assert.equal(answers[0].id, 'price');
  assert.match(answers[0].text, /no verified price list/);
});
test('Spanish accents and inflected service words find localized routes', () => {
  assert.equal(answerQuestion('¿Cuánto cuesta una pérgola?', 'es')[0].id, 'price');
  assert.equal(answerQuestion('Fotos de proyectos', 'es')[0].href, '/es/gallery/');
  assert.equal(answerQuestion('Teléfono de contacto', 'es')[0].href, '/es/contact/');
});
test('material comparison provides both useful service pages', () => {
  assert.deepEqual(answerQuestion('Aluminum or wood pergola?').map(x => x.id), ['aluminum', 'wood']);
});
test('unknown or hostile questions fall back without invented facts or executable links', () => {
  for (const question of ['bitcoin investment', '<img src=x onerror=alert(1)>', 'javascript:alert(1)']) {
    const answers = answerQuestion(question, 'es');
    assert.equal(answers[0].id, 'fallback');
    assert.equal(answers[0].href, '/es/contact/');
    assert.ok(!answers[0].text.includes(question));
  }
});
test('all answer destinations exist in the static bilingual site', () => {
  for (const lang of ['en', 'es']) for (const term of ['price', 'gallery', 'areas', 'contact', 'permit', 'timing', 'schedule', 'aluminum', 'wood', 'tiki', 'kitchen', 'pergola']) {
    for (const answer of answerQuestion(term, lang)) {
      const path = answer.href.split('#')[0];
      assert.ok(existsSync(`dist${path}index.html`), answer.href);
    }
  }
});
