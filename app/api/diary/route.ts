import { deleteDiary, insertDiaryEntry } from '../../../database/diaries';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
): Promise<NextResponse<{ status: number; error?: string }>> {
  try {
    const {
      exerciseSelection,
      exerciseReps1,
      exerciseWeight1,
      exerciseReps2,
      exerciseWeight2,
      exerciseReps3,
      exerciseWeight3,
      userId,
    } = await req.json();

    console.log('userId', userId);

    // Call the insertDiaryEntry function with the extracted data
    await insertDiaryEntry({
      exerciseSelection,
      exerciseReps1,
      exerciseWeight1,
      exerciseReps2,
      exerciseWeight2,
      exerciseReps3,
      exerciseWeight3,
      userId,
    });

    // Send a response back to the client
    // res.status(200).json({ success: true });
    return NextResponse.json({
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
    });
  }
}

// another method to delete diary
export async function DELETE(
  req: NextRequest,
): Promise<NextResponse<{ status: number }>> {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
      await deleteDiary(Number(id));
      return NextResponse.json({
        status: 200,
      });
    }
    return NextResponse.json({
      status: 422,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
    });
  }
}
