"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhoneBook1656584791690 = void 0;
class updatePhoneBook1656584791690 {
    constructor() {
        this.name = 'updatePhoneBook1656584791690';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`phone_book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`note\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`phone_book\``);
    }
}
exports.updatePhoneBook1656584791690 = updatePhoneBook1656584791690;
//# sourceMappingURL=1656584791690-updatePhoneBook.js.map