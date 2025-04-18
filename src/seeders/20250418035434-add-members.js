'use strict';

/** @type {import('sequelize-cli').Seed} */
export default {
  async up(queryInterface, Sequelize) {
    const members = await queryInterface.bulkInsert(
      'members',
      [
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          source_id: 'source_1',
          name: 'John Doe',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          source_id: 'source_2',
          name: 'Jane Smith',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          source_id: 'source_3',
          name: 'Alice Johnson',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      { returning: true } // This will return the inserted records
    );

    await queryInterface.bulkInsert(
      'check_ins',
      [
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          date: new Date(),
          member_id: members[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          date: new Date(),
          member_id: members[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: Sequelize.literal('uuid_generate_v4()'),
          date: new Date(),
          member_id: members[2].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      { returning: true }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('check_ins', null, {});
    await queryInterface.bulkDelete('members', null, {});
  }
};
