import { describe, it, expect } from 'vitest';
import { careerDetails, subtypeTypeMap } from '@/data/careerDetails';

const validSubtypes = new Set(Object.keys(subtypeTypeMap));

describe('Career subtypes validation', () => {
  it('all 2400 subtype slots use official subtypes', () => {
    const invalid: string[] = [];
    for (const career of careerDetails) {
      for (const sub of career.relatedSubtypes) {
        if (!validSubtypes.has(sub.label)) {
          invalid.push(`${career.name}: "${sub.label}"`);
        }
      }
    }
    expect(invalid).toEqual([]);
  });

  it('no career has duplicate subtypes', () => {
    const dupes: string[] = [];
    for (const career of careerDetails) {
      const labels = career.relatedSubtypes.map(s => s.label);
      if (new Set(labels).size !== labels.length) {
        dupes.push(`${career.name}: [${labels.join(', ')}]`);
      }
    }
    expect(dupes).toEqual([]);
  });

  it('has exactly 600 careers with 4 subtypes each', () => {
    expect(careerDetails.length).toBe(600);
    for (const career of careerDetails) {
      expect(career.relatedSubtypes.length).toBe(4);
    }
  });

  it('no phantom subtypes remain', () => {
    const phantoms = ['RESOLUÇÕES', 'ESTABILIDADE', 'COISAS'];
    for (const career of careerDetails) {
      for (const sub of career.relatedSubtypes) {
        expect(phantoms).not.toContain(sub.label);
      }
    }
  });

  it('each career has at least 2 subtypes of its own RIASEC type', () => {
    const failures: string[] = [];
    for (const career of careerDetails) {
      const ownTypeCount = career.relatedSubtypes.filter(
        (sub) => subtypeTypeMap[sub.label] === career.type
      ).length;
      if (ownTypeCount < 2) {
        failures.push(`${career.name} (${career.type}): only ${ownTypeCount} own-type subtypes`);
      }
    }
    expect(failures).toEqual([]);
  });
});
