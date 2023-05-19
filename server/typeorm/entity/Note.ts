import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Patient } from './Patient';
import { Entry } from './Entry';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
  visitDate: Date;

  @Column({ type: 'text', nullable: true })
  visitDateText: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  lastEdited: Date;

  @Column('integer', { nullable: true })
  heightFeet: number;

  @Column('integer', { nullable: true })
  heightInches: number;

  @Column('integer', { nullable: true })
  temperature: number;

  @Column('integer', { nullable: true })
  respiration: number;

  @Column('integer', { nullable: true })
  systolic: number;

  @Column('integer', { nullable: true })
  diastolic: number;

  @Column('integer', { nullable: true })
  physiotherapy: number;

  @Column('integer')
  phaseOneRoomAssignment: number;

  @Column('integer')
  phaseTwoRoomAssignment: number;

  @Column('integer')
  phaseThreeRoomAssignment: number;

  @Column('integer')
  phaseFourRoomAssignment: number;

  @Column('integer', { nullable: true })
  physio: number;

  @Column('integer', { nullable: true })
  tx: number;

  @Column('integer', { nullable: true })
  pulse: number;

  @Column({ type: 'text', nullable: true })
  otherNotes: string;

  @ManyToOne(() => Patient, (patient) => patient.notes)
  @JoinColumn()
  patient: Patient;

  @OneToMany(() => Entry, (entry) => entry.note)
  entries: Entry[];
}