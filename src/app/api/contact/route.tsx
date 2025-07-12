// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../../lib/mongodb';

interface ContactSubmission {
  _id?: ObjectId;
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
  timestamp: Date;
  status: 'new' | 'read' | 'replied' | 'archived';
  updatedAt?: Date;
  ipAddress?: string;
}

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

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection<ContactSubmission>('contacts');

    // Create submission object
    const submission: ContactSubmission = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      projectType: body.projectType || 'Not specified',
      timestamp: new Date(),
      status: 'new',
      ipAddress: request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown'
    };

    // Insert into database
    const result = await collection.insertOne(submission);

    // Log success
    console.log('✅ New contact submission saved:', {
      id: result.insertedId,
      name: submission.name,
      email: submission.email,
      subject: submission.subject,
      timestamp: submission.timestamp
    });

    // Optional: Send email notification
    // await sendEmailNotification(submission);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received successfully',
        submissionId: result.insertedId.toString()
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve submissions (for admin panel)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('key');
    
    // Check admin authentication
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection<ContactSubmission>('contacts');

    // Get all submissions, sorted by newest first
    const submissions = await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    // Transform for frontend (convert ObjectId to string)
    const transformedSubmissions = submissions.map(sub => ({
      id: sub._id?.toString() || '',
      name: sub.name,
      email: sub.email,
      subject: sub.subject,
      message: sub.message,
      projectType: sub.projectType,
      timestamp: sub.timestamp.toISOString(),
      status: sub.status,
      updatedAt: sub.updatedAt?.toISOString()
    }));

    console.log(`📊 Retrieved ${transformedSubmissions.length} submissions from database`);

    return NextResponse.json({
      success: true,
      submissions: transformedSubmissions,
      total: transformedSubmissions.length
    });

  } catch (error) {
    console.error('❌ GET submissions error:', error);
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
    const { id, status, adminKey }: { 
      id: string; 
      status: ContactSubmission['status']; 
      adminKey: string;
    } = body;

    // Check admin authentication
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid submission ID' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection<ContactSubmission>('contacts');

    // Update submission
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status: status,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    console.log(`✅ Updated submission ${id} status to: ${status}`);

    return NextResponse.json({
      success: true,
      message: 'Submission updated successfully'
    });

  } catch (error) {
    console.error('❌ PUT submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: Email notification function
async function sendEmailNotification(submission: ContactSubmission) {
  // TODO: Implement email notifications using:
  // - Nodemailer + Gmail
  // - SendGrid
  // - Resend
  // - AWS SES
  
  console.log('📧 Email notification would be sent here for:', submission.email);
}