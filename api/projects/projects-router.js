// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();

const { logger, checkProjectIdExists, checkValidProject } = require('../middleware/middleware')

router.get('/', logger, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    try {
        const result = await Projects.get()
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
});

router.get('/:id', logger, checkProjectIdExists, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    try {
        const result = await Projects.get(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
});

router.post('/', logger, checkValidProject, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    try {
        await Projects.insert(req.body);
        res.status(201).json(req.body);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', logger, checkProjectIdExists, checkValidProject, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    try {
        await Projects.update(req.params.id, req.body);
        res.status(200).json(req.body);
    } catch (error) {
        next(error);
    }
 });

 router.delete('/:id', logger, checkProjectIdExists, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    const { id } = req.params;
    await Projects.remove(id)
    try {
        await Projects.remove(req.params.id);
        res.status(200).json({message: `Successfully deleted project id ${id}`});
    } catch (error) {
        next(error);
    }
});

router.get('/:id/actions', logger, checkProjectIdExists, async (req, res, next) => {
    console.log(`hitting ${req.method} ${req.baseUrl}`);
    try {
        const projectActions = await Projects.getProjectActions(req.params.id);
        res.status(200).json(projectActions);
    } catch (error) {
        next(error);
    }
});

module.exports = router;