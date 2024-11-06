import { ObjectId } from 'mongodb';
import { Student, Course } from '../models/index.js';
import { Request, Response } from 'express';

/**
 * Aggregate function to get the total number of students
 * @returns number of students
 */
export const headCount = async () => {
    try {
        const result = await Student.aggregate([
            { $count: 'totalStudents' }
        ]);
        return result[0]?.totalStudents || 0;
    } catch (error) {
        console.error("Error in headCount aggregate function:", error);
        throw error;
    }
};

/**
 * Aggregate function to get the overall grade of a specific student
 * @param studentId string
 * @returns student grade and assignment scores
 */
export const grade = async (studentId: string) => {
    try {
        const result = await Student.aggregate([
            { $match: { _id: new ObjectId(studentId) } },
            { $unwind: '$assignments' },
            {
                $group: {
                    _id: '$_id',
                    overallGrade: { $avg: '$assignments.score' },
                    assignments: { $push: '$assignments' }
                }
            }
        ]);
        return result[0] || null;
    } catch (error) {
        console.error("Error in grade aggregate function:", error);
        throw error;
    }
};

/**
 * GET All Students /students
 * @returns an array of Students with headcount
 */
export const getAllStudents = async (_req: Request, res: Response) => {
    try {
        const students = await Student.find();
        const studentObj = {
            students,
            headCount: await headCount(),
        };
        res.json(studentObj);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * GET Student based on id /students/:id
 * @param string id
 * @returns a single Student object with overall grade
 */
export const getStudentById = async (req: Request, res: Response) => {
    const { studentId } = req.params;
    try {
        const student = await Student.findById(studentId);
        if (student) {
            res.json({
                student,
                grade: await grade(studentId)
            });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * POST Student /students
 * @param object student
 * @returns a single Student object
 */
export const createStudent = async (req: Request, res: Response) => {
    try {
        const student = await Student.create(req.body);
        res.json(student);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * DELETE Student based on id /students/:id
 * @param string id
 * @returns success message
 */
export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const student = await Student.findOneAndDelete({ _id: req.params.studentId });
        if (!student) {
            return res.status(404).json({ message: 'No such student exists' });
        }

        const course = await Course.findOneAndUpdate(
            { students: req.params.studentId },
            { $pull: { students: req.params.studentId } },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ message: 'Student deleted, but no courses found' });
        }

        return res.json({ message: 'Student successfully deleted' });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

/**
 * POST Assignment based on /students/:studentId/assignments
 * @param string id
 * @param object assignment
 * @returns updated student object
 */
export const addAssignment = async (req: Request, res: Response) => {
    console.log('You are adding an assignment');
    console.log(req.body);
    try {
        const student = await Student.findOneAndUpdate(
            { _id: req.params.studentId },
            { $addToSet: { assignments: req.body } },
            { runValidators: true, new: true }
        );

        if (!student) {
            return res.status(404).json({ message: 'No student found with that ID :(' });
        }

        return res.json(student);
    } catch (error) {
        return res.status(500).json(error);
    }
};

/**
 * DELETE Assignment based on /students/:studentId/assignments
 * @param string assignmentId
 * @param string studentId
 * @returns updated student object
 */
export const removeAssignment = async (req: Request, res: Response) => {
    try {
        const student = await Student.findOneAndUpdate(
            { _id: req.params.studentId },
            { $pull: { assignments: { assignmentId: req.params.assignmentId } } },
            { runValidators: true, new: true }
        );

        if (!student) {
            return res.status(404).json({ message: 'No student found with that ID :(' });
        }

        return res.json(student);
    } catch (error) {
        return res.status(500).json(error);
    }
};
