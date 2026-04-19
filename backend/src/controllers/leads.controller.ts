import { Request, Response } from 'express';
import { Lead } from '../models/Lead.model';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, message, company, phone, source } = req.body;

  if (!name || !email || !message) {
    throw new ApiError(400, 'Name, email, and message are required.');
  }

  const lead = await Lead.create({ name, email, message, company, phone, source });

  return ApiResponse({
    res,
    statusCode: 201,
    message: 'Message received. We will get back to you within 24 hours.',
    data: lead,
  });
});

export const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const page   = parseInt(req.query.page as string) || 1;
  const limit  = parseInt(req.query.limit as string) || 20;
  const status = req.query.status as string;
  const search = req.query.search as string;

  const filter: Record<string, unknown> = {};
  if (status && status !== 'all') filter.status = status;
  if (search) {
    filter.$or = [
      { name:  { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const total = await Lead.countDocuments(filter);
  const leads = await Lead.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Leads fetched successfully.',
    data: leads,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

export const updateLeadStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, 'Invalid status value.');
  }

  const lead = await Lead.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).lean();

  if (!lead) throw new ApiError(404, 'Lead not found.');

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Lead status updated.',
    data: lead,
  });
});

export const deleteLead = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) throw new ApiError(404, 'Lead not found.');

  return ApiResponse({
    res,
    statusCode: 200,
    message: 'Lead deleted successfully.',
    data: null,
  });
});