import useFetch  from '../../api/useFetch.js';
import Form from '../../UI/Form.js';


const emptyModule = {
  ModuleName: "Programming 3",
  ModuleCode: "CI6001",
  ModuleLevel: 0,
  ModuleLeaderID: 0,
  ModuleImage: "https://images.freeimages.com/images/small-previews/fa1/cable-5-1243077.jpg"
};

export default function ModuleForm({ onSubmit, onCancel, initialModule = emptyModule }) {
  
  // State ---------------------------------------
  const [module, setModule, errors, setErrors] = Form.useFormState(initialModule);
  
  // Handlers ------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    isValidateModule(module) && onSubmit(module);
    setErrors({ ...errors }); // setErrors(errors) does not work; perhaps React thinks errors has not changed?
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = (name === 'ModuleLevel') || (name === 'ModuleLeaderID') ? parseInt(value) : value;
    setModule({ ...module, [name]: newValue });
    setErrors({ ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name] });
  };

  const isValidateModule = (module) => {
    let isModuleValid = true;
    Object.keys(module).forEach((key) => {
      if (isValid[key](module[key])) {
        errors[key] = null; // Am I naughty to use the state variable as a temporary variable? See line 22 "setErrors({ ...errors })"
      } else {
        errors[key] = errorMessage[key];
        isModuleValid = false;
      }
    });
    return isModuleValid;
  }
  
  const isValid = {
    ModuleName: (name) => name.length > 8,
    ModuleCode: (code) => /^\D{2}\d{4}$/.test(code),
    ModuleLevel: (level) => (level > 2) && (level < 8),
    ModuleLeaderID: (id) => id !== 0,
    ModuleImage: (url) => /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(url)
  };
    
  const errorMessage = {
    ModuleName: "Module name is too short",
    ModuleCode: "Module code is not a valid format",
    ModuleLevel: "Invalid module level",
    ModuleLeaderID: "No module leader has been selected",
    ModuleImage: "Module image is not a valid URL"
  }

  // API Calls -----------------------------------
  const [users, , loadingMessage] = useFetch("Users", "GET");

  // View ----------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel} >
      <Form.Item
        label="Module name"
        error={errors.ModuleName}
      >
        <input
          type="text"
          name="ModuleName"
          placeholder="Please enter the module name"
          value={module.ModuleName}
          onChange={handleChange} 
        /> 
      </Form.Item>
      
      <Form.Item
        label="Module code"
        error={errors.ModuleCode}
      >
        <input
          type="text"
          name="ModuleCode"
          placeholder="Please enter the module code"
          value={module.ModuleCode}
          onChange={handleChange} 
        />
      </Form.Item>

      <Form.Item
        label="Module level"
        advice="Choose a level between 3 and 7 inclusive"
        error={errors.ModuleLevel}
      >
        <select
          name="ModuleLevel"
          value={module.ModuleLevel}
          onChange={handleChange} 
        >
          <option value="0" disabled>Select module level</option>
          {
            [3, 4, 5, 6, 7].map((level) => <option key={level}>{level}</option>)
          }
        </select>
      </Form.Item>

      <Form.Item
        label="Module leader"
        error={errors.ModuleLeaderID}
      >
        {
          !users
            ? <p>{loadingMessage}</p>
            : users.length === 0
              ? <p>No users found</p>
              : <select
                  name="ModuleLeaderID"
                  value={module.ModuleLeaderID}
                  onChange={handleChange} 
                >
                  <option value="0">Select module leader ...</option>
                  {
                    users.map((user) => 
                      <option key={user.UserID} value={user.UserID} >
                        {user.UserSurname}, {user.UserFirstname}
                      </option>
                    )
                  }
                </select>
        }
      </Form.Item>

      <Form.Item
        label="Module image URL"
        advice="Provide the URL of an image"
        error={errors.ModuleImage}
      >
        <input
          type="text"
          name="ModuleImage"
          value={module.ModuleImage}
          onChange={handleChange} 
        />
      </Form.Item>

    </Form>
  );
}
