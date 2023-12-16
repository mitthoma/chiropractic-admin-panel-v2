export const updateComplaintText = (complaints, index, newText) => {
    complaints[index].text = newText;
  };
  
  export const updateComplaintPainLevel = (complaints, index, newPainLevel) => {
    complaints[index].painLevel = newPainLevel;
  };
  
  export const addComplaint = (complaints) => {
    complaints.push({
      text: '',
      painLevel: 0,
    });
  };
  
  export const hasAnyField = (entryData, entryFields) => {
    return entryFields.some(field => entryData.hasOwnProperty(field));
  };
  
  export const formatDate = (datetime) => {
    const z = n => ('0' + n).slice(-2);
    const YYYY = datetime.getUTCFullYear();
    const MM = z(datetime.getUTCMonth() + 1);
    const DD = z(datetime.getUTCDate());
    const HH = z(datetime.getUTCHours());
    const mm = z(datetime.getUTCMinutes());
    const ss = z(datetime.getUTCSeconds());
    return `${YYYY}-${MM}-${DD} ${HH}:${mm}:${ss}`;
  };
  
  export const mapEntriesToGrid = (entries, levels, levelKey) => {
    return levels.map(level => {
      const entry = entries.find(entry => entry[levelKey] === level);
      return entry || null;
    });
  };
  
  export const saveEntries = async (grid, levels, entryFields, entryService, noteId, levelKey) => {
    let noteEntries = await entryService.getEntriesForNote({ noteId });
    for (let i = 0; i < grid.length; i++) {
      let entryData = {
        noteId: noteId,
        [levelKey]: levels[i],
      };
  
      if (grid[i] && grid[i].length) {
        entryFields.forEach((field, j) => {
          if (grid[i][j]) {
            entryData[field] = grid[i][j];
          }
        });
      }
  
      if (hasAnyField(entryData, entryFields)) {
        let existingEntry = noteEntries.find(entry => entry[levelKey] === levels[i]);
        if (existingEntry) {
          await entryService.updateEntry({ ...existingEntry, ...entryData });
        } else {
          await entryService.addEntry(entryData, noteId);
        }
      }
    }
  };