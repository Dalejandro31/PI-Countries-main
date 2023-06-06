const { sequelize } = require('sequelize');
const { Activity } = sequelize.models; 

describe('test para el modelo actividad', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    afterEach(async () => {
        await Activity.destroy({ truncate: true });
    });

    it('deberia crear una actividad', async () => {
        const activityData = {
            name: 'Test Activity',
            difficulty: 3,
            duration : 60,
            season : 'Summer', 
        };

        const activity = await Activity.Create(activityData);

        expect(activity.name).toBe(activityData.name);
        expect(activity.difficulty).toBe(activityData.difficulty);
        expect(activity.duration).toBe(activityData.duration);
        expect(activity.season).toBe(activityData.season);
    });

    it('si no se crea la actividad', async () => {
        const invalidActivityData = {
            name : 'Invalid Activity',
            difficulty : 6,
            season : 'Fall',
        };

        await expect(Activity.create(invalidActivityData)).rejects.toThrow();
    });

});
