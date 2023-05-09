import { employeeEntity } from "src/employee/employee.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class customerEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: '123' })
    password: string;

    @Column()
    name: string;

    @Column({unique:true})
    email: string;

    @Column({unique:true})
    phone: string;

    @Column()
    address: string;

    @Column({default: 'none.png'})
    profile: string;

    @ManyToOne(()=>employeeEntity, (employeeEntity)=>employeeEntity.customers)
    employee: employeeEntity;
}
