import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddSenderIdFieldAndTransferTypeToStatements1630884159052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn("statements", "type");

      await queryRunner.addColumn("statements", new TableColumn({
        name: 'type',
        type: 'enum',
        enum: ['deposit', 'withdraw', 'transfer']
      }));

      await queryRunner.addColumn("statements", new TableColumn({
        name: "receiver_id",
        type: 'uuid',
        isNullable: true,
      }));

      await queryRunner.createForeignKey("statements", new TableForeignKey(
        {
          name: 'FKUserSenderStatement',
          columnNames: ['receiver_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey("statements", "FKUserSenderStatement");

      await queryRunner.dropColumn("statements", "receiver_id");

      await queryRunner.dropColumn("statements", "type");

      await queryRunner.addColumn("statements", new TableColumn({
        name: 'type',
        type: 'enum',
        enum: ['deposit', 'withdraw']
      }));
    }
}
