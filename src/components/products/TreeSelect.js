import React, { useState } from 'react';

const TreeSelect = ({ treeData, value, onChange }) => {
  const [expandedKeys, setExpandedKeys] = useState([]);

  const handleExpand = (key) => {
    if (expandedKeys.includes(key)) {
      setExpandedKeys(expandedKeys.filter(k => k !== key));
    } else {
      setExpandedKeys([...expandedKeys, key]);
    }
  }

  const renderTreeNodes = (nodes) => {
    return nodes.map(node => (
      <li key={node.value} style={{ listStyle: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {node.children.length > 0 && (
            <button
              onClick={() => handleExpand(node.value)}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                marginRight: 8,
              }}
            >
              {expandedKeys.includes(node.value) ? '-' : '+'}
            </button>
          )}
          <label style={{ margin: 0 }}>
            <input
              type="radio"
              name="category"
              value={node.value}
              checked={value === node.value}
              onChange={onChange}
              disabled={node.children.length > 0}
              style={{ marginRight: 8 }}
            />
            {node.label}
          </label>
        </div>
        {node.children.length > 0 && expandedKeys.includes(node.value) && (
          <ul style={{ paddingLeft: 24 }}>
            {renderTreeNodes(node.children)}
          </ul>
        )}
      </li>
    ));
  }

  return (
    <ul style={{ padding: 0, margin: 0 }}>
      {renderTreeNodes(treeData)}
    </ul>
  );
}

export default TreeSelect;

