import type { Employee } from "../types/employee";
import { employees } from "../data/employees";

export const getEmployees = (): Employee[] => {
  return employees;
};