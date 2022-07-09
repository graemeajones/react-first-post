import API from '../../api/API.js';

const moduleData = {}; 
moduleData.create = (module) => API.post('Modules',module);
moduleData.read = (id) => API.get('Modules/'+id);
moduleData.update = (id, module) => API.put('Modules/' + id, module);
moduleData.delete = (id) => API.delete('Modules/'+id,module);
moduleData.list = () => API.get('Modules');

export default moduleData;