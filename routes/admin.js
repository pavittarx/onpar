const Router = require('express').Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 10, parts: 2 }});

Router.all('/', (req, res, next) => {
  // Check user permission before accessing these routes
});

// Read Employee information
Router.get('/employees', (req, res) => {
  // Get employee details
})

Router.post('/employees', upload.array('files', 100), (req, res) => {
  // Create new employees
  const files = req.files;

  console.log(files);
})

Router.put('/employee/:username', (req, res) => {s
  // Update Employees
})

Router.delete('/employee/:username', (req, res)=>{
  // Delete Employees
})

module.exports = Router;