// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');

const router = express.Router();

// Middleware example - if action exists, return it as req.action
function checkActionIdExists(req, res, next) {
    const { id } = req.params
    Actions.get(id)
      .then(action => {
        if (action) {
          req.action = action
          next()
        } else {
         next({ message: `action with id ${id} not found!!!` })
        }
      })
      .catch(next)
}

// module.exports = {
//     get,
//     insert,
//     update,
//     remove,
//   };

router.get('/actions', (req, res, next) => {
    // Returns an array of actions (or an empty array) as the body of the response.
});

router.get('/actions/:id', checkActionIdExists, (req, res, next) => {
    // Returns an action with the given id as the body of the response.
    // If there is no action with the given id it responds with a status code 404.
});
router.post('/actions', (req, res, next) => {
    // Returns the newly created action as the body of the response.
    // If the request body is missing any of the required fields it responds with a status code 400.
    // When adding an action make sure the project_id provided belongs to an existing project
});

router.put('/actions/:id', checkActionIdExists, (req, res, next) => {
    // Returns the updated action as the body of the response.
    // If there is no action with the given id it responds with a status code 404.
    // If the request body is missing any of the required fields it responds with a status code 400.
});

router.delete('/actions/:id', checkActionIdExists, (req, res, next) => {
    // Returns no response body.
    // If there is no action with the given id it responds with a status code 404.
});

module.exports = router;