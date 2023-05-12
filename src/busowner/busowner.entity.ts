import { employeeEntity } from "src/employee/employee.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class busownerEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({unique:true})
    email: string;

    @Column({unique:true})
    phone: string;

    @Column()
    address: string;

    @Column({default: 0})
    account: number;

    @Column({default: "No license"})
    brtalicense: string;

    @ManyToOne(()=>employeeEntity, (employeeEntity)=>employeeEntity.busowners)
    employee: employeeEntity
}
