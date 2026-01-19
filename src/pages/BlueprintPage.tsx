import { useState } from 'react';
import { saveData, loadData } from '../services/storage';

type FieldType = 'TEXT' | 'DATE' | 'SIGNATURE' | 'CHECKBOX';

interface BlueprintField {
  id: string;
  label: string;
  type: FieldType;
  x: number;
  y: number;
}

interface Blueprint {
  id: string;
  name: string;
  fields: BlueprintField[];
  createdAt: string;
}

const STORAGE_KEY = 'blueprints';

const BlueprintPage = () => {
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [type, setType] = useState<FieldType>('TEXT');
  const [fields, setFields] = useState<BlueprintField[]>([]);
  const [blueprints, setBlueprints] = useState<Blueprint[]>(
    loadData(STORAGE_KEY)
  );

  const addField = () => {
    if (!label.trim()) return;

    setFields([
      ...fields,
      {
        id: Date.now().toString(),
        label,
        type,
        x: 0,
        y: 0,
      },
    ]);
    setLabel('');
  };

  const createBlueprint = () => {
    if (!name.trim()) return;

    const blueprint: Blueprint = {
      id: Date.now().toString(),
      name,
      fields,
      createdAt: new Date().toISOString(),
    };

    const updated = [...blueprints, blueprint];
    setBlueprints(updated);
    saveData(STORAGE_KEY, updated);

    setName('');
    setFields([]);
    alert('Blueprint created successfully');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Blueprint</h2>

      <input
        placeholder="Blueprint name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h3>Add Field</h3>

      <input
        placeholder="Field label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value as FieldType)}
      >
        <option value="TEXT">Text</option>
        <option value="DATE">Date</option>
        <option value="SIGNATURE">Signature</option>
        <option value="CHECKBOX">Checkbox</option>
      </select>

      <button onClick={addField}>Add Field</button>

      <ul>
        {fields.map((f) => (
          <li key={f.id}>
            {f.label} ({f.type})
          </li>
        ))}
      </ul>

      <button onClick={createBlueprint}>Create Blueprint</button>

      <hr />

      <h3>Saved Blueprints</h3>

      <ul>
        {blueprints.map((b) => (
          <li key={b.id}>
            {b.name} ({b.fields.length} fields)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlueprintPage;
