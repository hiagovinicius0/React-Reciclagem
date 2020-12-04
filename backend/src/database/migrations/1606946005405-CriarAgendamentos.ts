import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CriarAgendamentos1606946005405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'agendamentos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'idfornecedor',
                        type: 'uuid',
                    },
                    {
                        name: 'idmotorista',
                        type: 'uuid',
                    },
                    {
                        name: 'idcomprador',
                        type: 'uuid',
                    },
                    {
                        name: 'datahorario',
                        type: 'timestamp with time zone',
                    }
                ]
            })
        )
        await queryRunner.createForeignKey(
            'agendamentos',
            new TableForeignKey({
                columnNames: ['idfornecedor'],
                referencedColumnNames: ['id'],
                referencedTableName: 'fornecedores',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        )
        await queryRunner.createForeignKey(
            'agendamentos',
            new TableForeignKey({
                columnNames: ['idmotorista'],
                referencedColumnNames: ['id'],
                referencedTableName: 'motoristas',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        )
        await queryRunner.createForeignKey(
            'agendamentos',
            new TableForeignKey({
                columnNames: ['idcomprador'],
                referencedColumnNames: ['id'],
                referencedTableName: 'compradores',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('agendamentos');
    }

}
