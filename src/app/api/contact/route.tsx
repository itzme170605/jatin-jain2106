// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
  timestamp: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  updatedAt?: string;
}

// In-memory storage (replace with database in production)
let contactSubmissions: ContactSubmission[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create submission object
    const submission: ContactSubmission = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      projectType: body.projectType || 'Not specified',
      timestamp: body.timestamp || new Date().toISOString(),
      status: 'new'
    };

    // Store submission (in production, save to database)
    contactSubmissions.push(submission);

    // Log submission (remove in production)
    console.log('New contact submission:', {
      id: submission.id,
      name: submission.name,
      email: submission.email,
      subject: submission.subject,
      timestamp: submission.timestamp
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received successfully',
        submissionId: submission.id 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to view submissions (for admin panel)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('key');
    
    // Simple admin key check (use proper auth in production)
    if (adminKey !== 'your-admin-key-here') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Return all submissions sorted by newest first
    const sortedSubmissions = contactSubmissions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({
      success: true,
      submissions: sortedSubmissions,
      total: sortedSubmissions.length
    });

  } catch (error) {
    console.error('GET submissions error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT endpoint to update submission status
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, adminKey }: { id: string; status: ContactSubmission['status']; adminKey: string } = body;

    // Simple admin key check (use proper auth in production)
    if (adminKey !== 'your-admin-key-here') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Find and update submission
    const submissionIndex = contactSubmissions.findIndex(sub => sub.id === id);
    if (submissionIndex === -1) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    contactSubmissions[submissionIndex].status = status;
    contactSubmissions[submissionIndex].updatedAt = new Date().toISOString();

    console.log(`Updated submission ${id} status to: ${status}`);

    return NextResponse.json({
      success: true,
      message: 'Submission updated successfully'
    });

  } catch (error) {
    console.error('PUT submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}