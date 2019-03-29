const express = require('express');
const router = express.Router()
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

router.get('/', (req, res) => {
	db.from('projects')
		.then(cohort => {
			res.status(200).json(cohort);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get('/:id', (req, res) => {
	const uniqueCohort = req.params.id;
	db.from('projects')
		.where({ id: uniqueCohort })
		.then(project => {
			res.status(200).json(cohort);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});
router.get("/:id/actions", (req, res) => {
	const { id } = req.params;
	db('projects').where('id', id)
    .then(project => {
      if(project) {
        db('actions').where('project_id', id)
          .then(actions => {
            project[0].actions = actions;
            res.status(200).json(project);
          })
          .catch(err => {
            res.status(500).json({ error: ' error' })
          })
      } else {
        res.status(404).json({ error: 'Failed to find project' })
      }
    })

})

router.post('/', (req, res) => {
	const projects = req.body;
	db('projects')
		.insert(projects)
		.then(cohort => {
			res.status(201).json(cohort);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.put('/:id', (req, res) => {
	const cohortToModify = req.params.id;
	db('projects')
		.where({ id: cohortToModify })
		.update(req.body)
		.then(cohort => {
			res.status(200).json(cohort);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	const cohortToDelete = req.params.id;
	db('projects')
		.where({ id: cohortToDelete })
		.del()
		.then(cohort => {
			res.status(200).json(cohort);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;